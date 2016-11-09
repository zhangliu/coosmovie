<?php

namespace app\controllers;

use Yii;
use yii\filters\Cors;
use yii\web\Controller;
use app\models\PlayLog;

class PlayLogController extends Controller{
  public $enableCsrfValidation=false;
  public function behaviors() {
    return [
      'corsFilter' => Yii::$app->params['corsFilter'],
    ];
  }

  public function actionAdd() {
    if (!Yii::$app->user->id) {
      return false;
    }
    $data = Yii::$app->request->post();
    $data['user_id'] = Yii::$app->user->id;
    $data['content'] = isset($data['content']) ? json_encode($data['content']) : null;
    $data['start_time'] = date('Y-m-d H:i:s');
    $model = new PlayLog();
    if ($model->load($data, '') && $model->save()) {
      return true;
    }
    return false;
  }

  public function actionGetScoreInfo() {
    $uid = Yii::$app->user->id;
    $obj = new \stdClass();
    if (!$uid) {
      return $obj;
    }
    $movieSliceId = Yii::$app->request->get('movieSliceId');
    $startPlayLog = PlayLog::find()
      ->where(['type' => 'start_play', 'segment_index' => 0, 'user_id' => $uid, 'movie_slice_id' => $movieSliceId])
      ->orderBy('start_time desc')
      ->one();
    if (!$startPlayLog) {
      return $obj;
    }
    $startId = $startPlayLog->attributes['id'];
    $logs = PlayLog::find()
      ->where(['and', ['user_id' => $uid], ['movie_slice_id' => $movieSliceId], ['>=', 'id', $startId]])
      ->orderBy('start_time')
      ->all();
    $obj->playDuration = $this->getPlayDuration($logs);
    $obj->helpLogLength = $this->getHelpLogLength($logs);
    return $obj;
  }

  private function getPlayDuration($logs) {
    $startLog = null;
    $duration = 0;
    foreach($logs as $log) {
      if (!$startLog && $log->type === 'start_play') {
        $startLog = $log;
        continue;
      }
      if ($startLog && $log->type === 'stop_play') {
        $duration += strtotime($log->start_time) - strtotime($startLog->start_time);
        $startLog = null;
      }
    }
    return $duration;
  }

  private function getHelpLogLength(&$logs) {
    $count = 0;
    foreach($logs as $log) {
      if ($log->type === 'show_sentence') {
        $count++;
      }
    }
    return $count;
  }
}
