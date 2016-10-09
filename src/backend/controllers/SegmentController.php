<?php

namespace app\controllers;

use Yii;
use yii\filters\Cors;
use yii\web\Controller;
use app\models\Movie;

class SegmentController extends Controller{
  public $enableCsrfValidation=false;
  public function behaviors(){
    return [
      'corsFilter' => [
        'class' => Cors::className(),
        'cors' => [
          'Origin' => ['http://localhost:8080'],
          'Access-Control-Request-Method' => ['GET', 'POST', 'OPTION'],
          'Access-Control-Request-Headers' => ['*'],
          'Access-Control-Allow-Credentials' => true,
        ],
      ]
    ];
  }

  public function actionUpcreate(){
    $postData = Yii::$app->request->post();
    $movie = Movie::findOne(intval($postData['movieId']));
    if (!$movie) {
      throw new Exception('没有找到指定的电影！');
    }
    $segments = json_decode($movie->segments);
    $segments[$postData['segment']['index']] = $postData['segment'];
    $movie->segments = json_encode($segments);
    $movie->save();
  }

  public function actionClear(){
    $postData = Yii::$app->request->post();
    $movie = Movie::findOne(intval($postData['movieId']));
    if (!$movie) {
      throw new Exception('没有找到指定的电影！');
    }
    $movie->segments = json_encode([]);
    $movie->save();
  }
}
