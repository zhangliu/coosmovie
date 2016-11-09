<?php
namespace app\commands;

use yii\console\Controller;
use app\models\Movie;

use Qiniu\Auth;
use Qiniu\Storage\UploadManager;

class MovieController extends Controller{
  public function actionAdd($inputDir, $offset = 5000, $sliceTime = 300000){ // 300000表示五分钟，单位毫秒

    // 文件检测
    if (!is_dir($inputDir)) {
      echo '文件夹路径不正确'.PHP_EOL;
      return;
    }
    $moviePath = dirname($inputDir).'/'.basename($inputDir).'/movie.mov';
    $srtPath = dirname($inputDir).'/'.basename($inputDir).'/movie.srt';
    $infoPath = dirname($inputDir).'/'.basename($inputDir).'/info.json';
    if (!is_file($moviePath) || !is_file($srtPath) || !is_file($infoPath)) {
      echo '视频文件或者字幕文件或视频详情文件不存在当前目录当中！'.PHP_EOL;
      return;
    }
    $movieInfo = null;
    try {
      $movieInfo = json_decode(file_get_contents($infoPath));
    } catch (Exception $e) {
      echo '无法解析视频详情文件！'.PHP_EOL;
      return;
    }

    echo '开始解析字幕文件...'.PHP_EOL;
    $segments = $this->getSegments($srtPath);

    if (count($segments) <= 0) {
      echo '没有解析出任何字幕！'.PHP_EOL;
      return;
    }
    echo '解析出字幕'.count($segments).'个'.PHP_EOL;

    echo '开始解析切片...'.PHP_EOL;
    $slices = $this->getSlices($segments, basename($inputDir), $sliceTime);
    if (count($slices) <= 0) {
      echo '没有解析出任何切片!'.PHP_EOL;
      return;
    }
    echo '解析出切片'.count($slices).'个'.PHP_EOL;

    echo '开始切割视频...'.PHP_EOL;
    $slices = $this->sliceMovie($moviePath, $slices, $offset);
    echo '切割视频成功！'.PHP_EOL;

    echo '开始保存数据到数据库...'.PHP_EOL;
    $this->saveToDb($movieInfo, $slices);
    echo 'success! 已经完成所有数据！太棒啦！'.PHP_EOL;
  }

  private function getSegments($srtPath) {
    $lines = file($srtPath);
    $segments = array();
    $array = array();
    foreach($lines as $line) {
      if (preg_match('/^\s*$/', $line)) {
        try{
          $segment = $this->getSegment($array);
          $array = array();
          if ($segment === null) {
            continue;
          }
          $segments[] = $segment;
        } catch(Exception $e) {
          $array = array();
          echo '无法处理line:'.print_r($array, true)."\r\n";
        }
      } else {
        $array[] = $line;
      }
    }
    return $segments;
  }

  private function getSegment($array) {
    if (!is_array($array) || count($array) != 4) {
      return null;
    }
    preg_match('/(.*:.*:.*,.*)\s*-->\s*(.*:.*:.*,.*)$/', $array[1], $matchs);
    preg_match('/(.*):(.*):(.*),(.*)/', $matchs[1], $startMatchs);
    preg_match('/(.*):(.*):(.*),(.*)/', $matchs[2], $endMatchs);
    $segment = new \stdClass();
    $segment->startTime = $this->getTime($startMatchs);
    $segment->endTime = $this->getTime($endMatchs);
    $segment->translate = $array[2];
    $segment->sentence = $array[3];
    if ($segment->startTime <= 0 || $segment->endTime <= 0) {
      return null;
    }
    return $segment;
  }

  private function getTime($matchs) {
    $time = intval($matchs[1]) * 3600 * 1000
      + intval($matchs[2]) * 60 * 1000
      + intval($matchs[3]) * 1000
      + intval($matchs[4]);
    return $time;
  }

  private function getSlices(&$segments, $movieName, $sliceTime) {
    $outPath = 'views/movies/'.$movieName;
    if (!is_dir($outPath)) {
      mkdir($outPath);
    }
    $slices = array();
    $startTime = 0;
    $endTime = 0;
    $orderId = 0;
    $tmpSegments = array();
    foreach($segments as $segment) {
      $tmpSegments[] = $segment;
      $startTime = $startTime <= $segment->startTime ? $startTime : $segment->startTime;
      if (($segment->endTime - $startTime) >= $sliceTime) {
        $slice = new \stdClass();
        $slice->segments = $tmpSegments;
        $slice->orderId = ++$orderId;
        $slice->localSrc = $outPath.'/slice_'.$slice->orderId.'.mov';
        $slices[] = $slice;
        $startTime = $segment->startTime;
        $tmpSegments = array();
      }
    }
    return $slices;
  }

  private function sliceMovie($moviePath, &$slices, $offset) {
    foreach($slices as $slice) {
      $startTime = $slice->segments[0]->startTime;
      $startTime = ($startTime - $offset) > 0 ? ($startTime - $offset) : 0;
      $length = count($slice->segments);
      $endTime = $slice->segments[$length - 1]->endTime;
      $duration = $endTime + $offset - $startTime;

      $startTimeStr = $this->getTimeStr($startTime);
      $durationStr = $this->getTimeStr($duration);
      // $cmd = 'ffmpeg -y -ss '.$startTimeStr.' -t '.$durationStr.' -i '
      //   .$moviePath.' -vcodec copy -acodec copy '.$slice->localSrc;
      $cmd = 'ffmpeg -y -ss '.$startTimeStr.' -t '.$durationStr.' -i '
        .$moviePath.' -f mov copy '.$slice->localSrc;
      echo $cmd.PHP_EOL;
      exec($cmd);

      // 修正字幕时间
      foreach ($slice->segments as $segment) {
        $segment->startTime -= $startTime;
        $segment->endTime -= $startTime;
      }
    }
    return $slices;
  }

  private function getTimeStr($time) {
    $hours = intval($time / (3600 * 1000));
    $time = $time - $hours * 3600 * 1000;
    $minutes = intval($time / (60 * 1000));
    $time = $time - $minutes * 60 * 1000;
    $seconds = intval($time / 1000);
    $micSeconds = $time % 1000;
    return substr('00'.$hours, -2).':'.substr('00'.$minutes, -2).':'
      .substr('00'.$seconds, -2).'.'.substr('00'.$micSeconds, -3);
  }

  private function saveToDb($movieInfo, $slices) {
    return;
    $db = \YII::$app->db;
    $command = $db->createCommand("delete from emovie_movie where name = '".$movieInfo->name."'");
    $command->execute();
    $sql = 'insert into emovie_movie(name, english_name, introduce) '
      ."values('".$movieInfo->name."', '".$movieInfo->englishName."', '".$movieInfo->introduce."')";
    $command = $db->createCommand($sql);
    $command->execute();
    $command = $db->createCommand('select id from emovie_movie where name =\''.$movieInfo->name.'\'');
    $result = $command->queryOne();
    $movieId = intval($result['id']);
    foreach($slices as $slice) {
      $command = $db->createCommand('delete from emovie_movie_slice where local_src = \''.$slice->localSrc.'\'');
      $command->execute();
      $segmentsStr = "'".str_replace("'", "''", json_encode($slice->segments))."'";
      $sql = 'insert into emovie_movie_slice(movie_id, local_src, segments, orderId) '
        .'values('.$movieId.',\''.$slice->localSrc.'\','.$segmentsStr.','.$slice->orderId.')';
      $command = $db->createCommand($sql);
      $command->execute();
    }
  }

  public function actionUploadQiniu() {
    require_once 'vendor/qiniu/autoload.php';

    // 构建上传对象
    $accessKey = base64_decode(\YII::$app->params['accessKey']);
    $secretKey = base64_decode(\YII::$app->params['secretKey']);

    $auth = new Auth($accessKey, $secretKey);
    $bucket = 'emovie';
    $token = $auth->uploadToken($bucket);
    $uploadMgr = new UploadManager();

    // 去除要上传的视频
    $db = \YII::$app->db;
    $result = $db->createCommand('select id, local_src from emovie_movie_slice where src is null')
      ->queryAll();
    echo '获取需要上传的文件'.count($result).'个'.PHP_EOL;
    $errFiles = array();
    foreach ($result as $slice) {
      if (!is_file($slice['local_src'])) {
        continue;
      }
      echo '开始上传文件"'.$slice['local_src'].'"'.PHP_EOL;
      list($ret, $err) = $uploadMgr->putFile($token, null, $slice['local_src']);
      if ($err === null) {
        echo '文件"'.$slice['local_src'].'"上传成功！'.PHP_EOL;
        $db->createCommand('update emovie_movie_slice set src=\''.$ret['key'].'\' where id = '.$slice['id'])
          ->execute();
        $successFiles[] = $slice['local_src'];
      } else {
        echo '文件"'.$slice['local_src'].'"上传失败！！！！！！！！'.PHP_EOL;
        $errFiles[] = ['local_src' => $slice['local_src'], 'msg' => $err];
      }
    }
    echo '恭喜！上传完成！'.PHP_EOL;
    echo '上传失败的视频有'.count($errFiles).'个！'.PHP_EOL;
    echo '失败信息：'.PHP_EOL;
    foreach ($errFiles as $errFile) {
      echo '失败文件"'.$errFile['local_src'].'"'.PHP_EOL;
      var_dump($errFile['msg']);
      echo '--------------------------------------------'.PHP_EOL;
    }
  }

  public function actionMoveData() {
    $localDb = \YII::$app->db;
    $result = $localDb->createCommand('select * from emovie_movie_slice')
      ->queryAll();

    $remoteDb = new \yii\db\Connection([
        'dsn' => 'pgsql:host=115.28.143.126;port=5432;dbname=coosmovie',
        'username' => 'postgres',
        'password' => 'root',
    ]);
    $remoteDb->open();
    foreach($result as $row) {
      $remoteDb->createCommand('insert INTO coosmovie_movie_slice(id, movie_id, src, local_src, segments, order_id)'
        .'values('.$row['id'].', '.$row['movie_id'].', \''.$row['src'].'\', \''.$row['local_src'].'\', \''
        .str_replace("'", "''", $row['segments']).'\', '.$row['order_id'].')')->execute();
    }
  }
}
