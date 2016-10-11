<?php

namespace app\controllers;

use Yii;
use yii\filters\Cors;
use yii\web\Controller;
use app\models\PlayInfo;

class PlayinfoController extends Controller{
  public $enableCsrfValidation=false;
  public function behaviors(){
    return [
      'corsFilter' => [
        'class' => Cors::className(),
        'cors' => [
          'Origin' => Yii::$app->params['corsOrigin'],
          'Access-Control-Request-Method' => ['GET', 'POST', 'OPTION', 'PUT'],
          'Access-Control-Request-Headers' => ['*'],
          'Access-Control-Allow-Credentials' => true,
        ],
      ]
    ];
  }

  public function actionGet() {
    if (!Yii::$app->user->id) {
      return null;
    }
    $data = [
      'user_id' => Yii::$app->user->id,
      'movie_id' => Yii::$app->request->get('movieId'),
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
      'movie_id' => $postData['movieId'],
      'segment_index' => $postData['segmentIndex']
    ];
    return PlayInfo::upsert($data);
  }
}
