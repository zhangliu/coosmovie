<?php
namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

class User extends ActiveRecord implements IdentityInterface{

  public function safeAttributes() {
    return ['phone', 'password'];
  }

  public function login() {
    $password = md5(Yii::$app->params['passwordKey'].$this->password);
    $user = self::findOne(['phone' => $this->phone, 'password' => $password]);
    return Yii::$app->user->login($user, 0);
  }

  public function beforeSave($insert) {
    if (parent::beforeSave($insert)) {
      $this->password = md5(Yii::$app->params['passwordKey'].$this->password);
      if ($this->isNewRecord) {
        $this->auth_key = Yii::$app->security->generateRandomString();
      }
      return true;
    }
    return false;
  }

  public static function findIdentity($id) {
    return static::findOne($id);
  }

  public static function findIdentityByAccessToken($token, $type = null) {
    return static::findOne(['access_token' => $token]);
  }

  public function getId() {
    return $this->id;
  }

  public function getAuthKey() {
    // return $this->authKey;
  }

  public function validateAuthKey($authKey) {
    // return $this->authKey === $authKey;
  }
}
