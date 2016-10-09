<?php
namespace app\models;

use yii\db\ActiveRecord;

class Movie extends ActiveRecord{
  // public static function tableName(){
  //   return 'customer';
  // }
  public function safeAttributes() {
    return ['name', 'src', 'segements'];
  }
}
