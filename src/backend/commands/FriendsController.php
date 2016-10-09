<?php
namespace app\commands;

use yii\console\Controller;

class FriendsController extends Controller{
  public function actionConvertdialogue($dialoguePath){
    error_reporting(0);
    if (!is_dir($dialoguePath)) {
      return;
    }
    $dp = dir($dialoguePath);
    while($file = $dp->read()) {
      $filePath = dirname($dialoguePath).'/'.basename($dialoguePath).'/'.$file;
      if (!is_file($filePath)) {
        continue;
      }
      if (!preg_match('/.*\.srt$/i', $file)) {
        continue;
      }
      $lines = file($filePath);
      echo 'start convert file '.$filePath.'------------------------------------------'."\r\n";
      echo 'total lines '.count($lines)."\r\n";
      $segments = array();
      $array = array();
      foreach($lines as $line) {
        if (preg_match('/^\s*$/', $line)) {
          try{
            if (count($array) < 4) {
              continue;
            }
            preg_match('/(.*:.*:.*,.*)\s*-->\s*(.*:.*:.*,.*)$/', $array[1], $matchs);
            preg_match('/(.*):(.*):(.*),(.*)/', $matchs[1], $startMatchs);
            preg_match('/(.*):(.*):(.*),(.*)/', $matchs[2], $endMatchs);
            $segment = new \stdClass();
            $segment->startTime = $this->getTime($startMatchs);
            $segment->endTime = $this->getTime($endMatchs);
            $segment->sentence = $array[2];
            $segment->translate = iconv('gbk', 'utf-8', $array[3]);
            if ($segment->startTime <= 0 || $segment->endTime <= 0
              || preg_match('/^\s*$/', $segment->sentence)) {
              continue;
            }
            $segments[] = $segment;
            $array = array();
          } catch(Exception $e) {
            echo '无法处理line:'.$line;
          }
        } else {
          $array[] = $line;
        }
      }
      print_r($segments);
      return;
    }
    echo 'success!';
  }

  private function getTime($matchs) {
    $time = intval($matchs[1]) * 3600 * 1000
      + intval($matchs[2]) * 60 * 1000
      + intval($matchs[3]) * 1000
      + intval($matchs[4]);
    return $time / 1000.0;
  }
}
