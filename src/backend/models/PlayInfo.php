<?php
namespace app\models;

use yii\db\ActiveRecord;

class PlayInfo extends ActiveRecord
{
  // public static function tableName(){
  //   return 'customer';
  // }
  public function safeAttributes() {
    return ['user_id', 'movie_id', 'segment_index'];
  }

  public function rules() {
    return [
      [['movie_id', 'user_id', 'segment_index'], 'integer', 'min' => 1],
    ];
  }

  public static function upsert($data) {
    $movie = self::findOne(['user_id' => $data['user_id'], 'movie_id' => $data['movie_id']]);
    if ($movie) {
      $movie->segment_index = $data['segment_index'];
      return $movie->save();
    }
    $model = new self();
    $model->load($data, '');
    return $model->save();
  }

  public static function getOne($data) {
    return self::findOne(['user_id' => $data['user_id'], 'movie_id' => $data['movie_id']]);
  }
}
