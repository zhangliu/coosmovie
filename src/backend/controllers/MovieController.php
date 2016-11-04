<?php

namespace app\controllers;

use Yii;
use yii\filters\Cors;
use yii\web\Controller;
use app\models\Movie;
use app\models\MovieSlice;

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
    $movieIds = [];
    foreach($movies as $movie) {
      $movieIds[] = $movie->id;
    }
    // 补上slices
    $slices = MovieSlice::find()->where(['movie_id' => $movieIds])->select('id')->all();

    foreach($movies as $movie) {
      $tmpMovie = $movie->attributes;
      $tmpMovie['sliceIds'] = $this->getSliceIds($movie->id, $slices);
      $result[] = $tmpMovie;
    }
    return $result;
  }

  private function getSliceIds($movieId, &$slices) {
    $result = [];
    foreach ($slices as $slice) {
      if ($slice->movie_id === $movieId) {
        continue;
      }
      $result[] = $slice->id;
    }
    return $result;
  }
}
