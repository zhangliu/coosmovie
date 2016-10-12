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
    $movie = Movie::findOne(Yii::$app->request->get()['id']);
    return $movie->attributes;
  }

  public function actionCreate() {
    return;
    $movie = new Movie();
    $movie->load(Yii::$app->request->post(), '');
    $movie->segements = json_encode($movie->segements);
    $movie->save();
  }
}
