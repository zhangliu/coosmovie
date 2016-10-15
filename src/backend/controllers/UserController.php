<?php

namespace app\controllers;

use Yii;
use yii\filters\Cors;
use yii\web\Controller;
use app\models\User;

class UserController extends Controller{
  public $enableCsrfValidation=false;
  public function behaviors(){
    return [
      'corsFilter' => Yii::$app->params['corsFilter'],
    ];
  }

  public function actionLogin() {
    if (!Yii::$app->user->isGuest) {
      return true;
    }
    $model = new User();
    if ($model->load(Yii::$app->request->post(), '') && $model->login()) {
      return true;
    }
    return false;
  }

  public function actionLogout() {
    return Yii::$app->user->logout();
  }

  public function actionCreate() {
    $model = new User();
    if ($model->load(Yii::$app->request->post(), '') && $model->save()) {
      return true;
    }
    return false;
  }

  public function actionGet() {
    if (Yii::$app->user->id) {
      $user = User::findOne(Yii::$app->user->id);
      return ['phone' => $user->phone];
    }
    return null;
  }
}
