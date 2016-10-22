<?php
namespace app\commands;

use yii\console\Controller;
use app\models\Movie;

class MovieController extends Controller{
  public function actionAdd($dir, $sliceTime = 300000){ // 300000表示五分钟，单位毫秒

    // 文件检测
    if (!is_dir($dir)) {
      echo '文件夹路径不正确'.PHP_EOL;
      return;
    }
    $moviePath = dirname($dir).'/'.basename($dir).'/movie.mov';
    $srtPath = dirname($dir).'/'.basename($dir).'/movie.srt';
    $infoPath = dirname($dir).'/'.basename($dir).'/info.json';
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
    $slices = $this->getSlices($segments, basename($dir), $sliceTime);
    if (count($slices) <= 0) {
      echo '没有解析出任何切片!'.PHP_EOL;
      return;
    }
    echo '解析出切片'.count($slices).'个'.PHP_EOL;

    echo '开始切割视频...'.PHP_EOL;
    $this->sliceMovie($moviePath);
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
          if ($segment === null) {
            continue;
          }
          $segments[] = $segment;
          $array = array();
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
    if (!is_array($array) || count($array) < 4) {
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
        $slice->src = 'views/movies/'.$movieName.'_'.$slice->orderId;
        $slices[] = $slice;
        $startTime = $segment->startTime;
        $tmpSegments = array();
      }
    }
    return $slices;
  }

  private function sliceMovie($moviePath) {
    return true;
  }

  private function saveToDb($infoPath, $slices) {
    // $segmentsStr = "'".str_replace("'", "''", json_encode($segments))."'";
    // $db = \YII::$app->db;
    // file_put_contents('tmp.txt', 'update emovie_movie set segments='.$segmentsStr.' where id = 1');
    // $command = $db->createCommand('update emovie_movie set segments='.$segmentsStr.' where id = 1');
    // $command->execute();
  }
}
