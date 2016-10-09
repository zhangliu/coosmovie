<?php

namespace app\controllers;

use Yii;
use yii\filters\Cors;
use yii\web\ActiveController;
use app\models\Movie;

class PlayerController extends ActiveController{
  public $modelClass = 'app\models\Player';

  public function behaviors(){
    return [
      'corsFilter' => [
        'class' => Cors::className(),
        'cors' => [
          'Origin' => ['http://localhost:8080'],
          'Access-Control-Request-Method' => ['GET', 'POST', 'OPTION'],
          'Access-Control-Allow-Credentials' => true,
        ],
      ]
    ];
  }

  public function actionPostsegement(){
    return json_encode('333');
  }
}
