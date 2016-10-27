<?php

namespace app\controllers;

use Yii;
use yii\filters\Cors;
use yii\web\Controller;
use app\models\Movie;

class MovieController extends Controller{
  public $enableCsrfValidation=false;
  public function behaviors(){
    return [
      'corsFilter' => Yii::$app->params['corsFilter'],
    ];
  }

  public function actionGet() {
    $movies = Movie::find()->all();
    $result = [];
    foreach($movies as $movie) {
      $result[] = $movie->attributes;
    }
    return $result;
  }

}
