DROP DATABASE IF EXISTS tourmvp;

CREATE DATABASE tourmvp;

\c tourmvp;

CREATE TABLE Users (
  id serial not null,
  email varchar(255),
  username varchar(255),
  pw varchar(255),
  profile_pic_url varchar(255),
  created_tours int[]
)

CREATE TABLE Tours (
  id serial not null,
  tour_name varchar(255),
  pano_photos int[],
  id_user int
)

CREATE TABLE Objects (
  id serial not null,
  x decimal,
  y decimal,
  object_value varchar(255),
  scale decimal[],
  id_pano int
)

CREATE TABLE Panos (
  id int,
  img_url varchar(255)
)