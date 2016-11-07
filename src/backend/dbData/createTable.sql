-- Table: emovie_movie
CREATE TABLE emovie_movie
(
  id serial NOT NULL,
  name character varying(50),
  english_name character varying(50),
  img_src character varying(200),
  type character varying(20),
  introduce character varying(250),
  CONSTRAINT emovie_movie_pkey PRIMARY KEY (id)
);

-- Table: emovie_play_info
CREATE TABLE emovie_play_info
(
  id serial NOT NULL,
  movie_slice_id integer,
  user_id integer,
  segment_index integer NOT NULL DEFAULT 0,
  score integer NOT NULL DEFAULT 0,
  CONSTRAINT emovie_user_play_info_pkey PRIMARY KEY (id)
);

-- Table: emovie_user
CREATE TABLE emovie_user
(
  id serial NOT NULL,
  phone character varying(20),
  password character varying(100),
  auth_key character varying(32),
  CONSTRAINT emovie_user_pkey PRIMARY KEY (id),
  CONSTRAINT emovie_user_phone_key UNIQUE (phone)
);

-- Table: emovie_movie_slice
CREATE TABLE emovie_movie_slice
(
  id serial NOT NULL,
  movie_id integer,
  src character varying(100),
  local_src character varying(100),
  segments json DEFAULT '[]'::json,
  order_id integer,
  CONSTRAINT emovie_movie_slice_pkey PRIMARY KEY (id)
);

-- Table: emovie_play_log
CREATE TABLE emovie_play_log
(
  id serial NOT NULL,
  user_id integer,
  movie_slice_id integer,
  segment_index integer,
  content json DEFAULT '{}'::json,
  type character varying(20),
  start_time timestamp with time zone NOT NULL,
  CONSTRAINT emovie_play_log_pkey PRIMARY KEY (id)
)
