<?php

namespace app\controllers;

use Yii;
use yii\filters\Cors;
use yii\web\Controller;
use app\models\PlayInfo;

class PlayInfoController extends Controller{
  public $enableCsrfValidation=false;
  public function behaviors(){
    return [
      'corsFilter' => Yii::$app->params['corsFilter'],
    ];
  }

  public function actionGet() {
    if (!Yii::$app->user->id) {
      return null;
    }
    $data = [
      'user_id' => Yii::$app->user->id,
      'movie_slice_id' => Yii::$app->request->get('movieSliceId'),
    ];
    $playInfo = PlayInfo::getOne($data);
    if (!$playInfo) {
      return null;
    }
    return [
      'segmentIndex' => $playInfo['segment_index'],
    ];
  }

  public function actionUpsert(){
    if (!Yii::$app->user->id) {
      throw new Excetion('用户未登录');
    }
    $postData = Yii::$app->request->post();
    $data = [
      'user_id' => Yii::$app->user->id,
      'movie_slice_id' => $postData['movieSliceId'],
      'segment_index' => $postData['segmentIndex']
    ];
    return PlayInfo::upsert($data);
  }
}
