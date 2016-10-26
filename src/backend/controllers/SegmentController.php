<?php

namespace app\controllers;

use Yii;
use yii\filters\Cors;
use yii\web\Controller;
use app\models\MovieSlice;

class SegmentController extends Controller{
  public $enableCsrfValidation=false;
  public function behaviors(){
    return [
      'corsFilter' => Yii::$app->params['corsFilter'],
    ];
  }

  public function actionUpcreate(){
    $postData = Yii::$app->request->post();
    $movieSlice = MovieSlice::findOne(intval($postData['movieSliceId']));
    if (!$movieSlice) {
      throw new Exception('没有找到指定的电影切片！');
    }
    $segments = json_decode($movieSlice->segments);
    $segments[$postData['segment']['index']] = $postData['segment'];
    $movieSlice->segments = json_encode($segments);
    $movieSlice->save();
  }
}
