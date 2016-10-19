<?php
namespace app\commands;

use yii\console\Controller;
use app\models\Movie;

class DialogueController extends Controller{
  public function actionConvertdialogue($filePath){
    if (!is_file($filePath)) {
      echo '文件路径不正确';
      return;
    }
    if (!preg_match('/.*\.srt$/i', $filePath)) {
      echo '文件后缀名不正确，只支持后缀为.srt的文件';
      return;
    }
    $lines = file($filePath);
    echo 'start convert file '.$filePath.'-----------------'."\r\n";
    echo 'total lines '.count($lines)."\r\n";
    $segments = array();
    $array = array();
    foreach($lines as $line) {
      if (preg_match('/^\s*$/', $line)) {
        try{
          if (count($array) < 4) {
            $array = array();
            continue;
          }
          preg_match('/(.*:.*:.*,.*)\s*-->\s*(.*:.*:.*,.*)$/', $array[1], $matchs);
          preg_match('/(.*):(.*):(.*),(.*)/', $matchs[1], $startMatchs);
          preg_match('/(.*):(.*):(.*),(.*)/', $matchs[2], $endMatchs);
          $segment = new \stdClass();
          $segment->startTime = $this->getTime($startMatchs);
          $segment->endTime = $this->getTime($endMatchs);
          $segment->translate = $array[2];
          $segment->sentence = $array[3];//strtolower(preg_replace('/|[^\sa-zA-Z0-9]/', '', $array[3]));
          if ($segment->startTime <= 0 || $segment->endTime <= 0) {
            continue;
          }
          $segments[] = $segment;
          $array = array();
        } catch(Exception $e) {
          echo '无法处理line:'.print_r($array, true)."\r\n";
        }
      } else {
        $array[] = $line;
      }
    }
    if (count($segments) <= 0) {
      echo '没有解析出任何台词！';
      return;
    }
    $segmentsStr = "'".str_replace("'", "''", json_encode($segments))."'";
    $db = \YII::$app->db;
    // file_put_contents('tmp.txt', 'update emovie_movie set segments='.$segmentsStr.' where id = 1');
    $command = $db->createCommand('update emovie_movie set segments='.$segmentsStr.' where id = 1');
    $command->execute();
    echo 'success!'."\r\n";
  }

  private function getTime($matchs) {
    $time = intval($matchs[1]) * 3600 * 1000
      + intval($matchs[2]) * 60 * 1000
      + intval($matchs[3]) * 1000
      + intval($matchs[4]);
    return $time;
  }
}
