DROP DATABASE IF EXISTS tourmvp;

CREATE DATABASE tourmvp;

\c tourmvp;

CREATE TABLE Users (
  id serial primary key,
  email varchar(255),
  username varchar(255),
  pw varchar(255),
  profile_pic_url varchar(255),
  created_tours int[]
)

CREATE TABLE Tours (
  id serial primary key,
  linked_img_url varchar(255),
  pic_url varchar(255),
  latitude numeric(10, 5),
  longitude numeric(10, 5),
  tour_name varchar(255),
  skybox_photos int[],
  pano_photos int[],
  id_user int references Users (id)
)

CREATE TABLE Panos (
  id serial primary key,
  img_url varchar(255)
)

CREATE TABLE Skyboxs (
  id serial primary key,
  img_index int
)

CREATE TABLE Objects (
  id serial primary key,
  x decimal,
  y decimal,
  object_value varchar(255),
  scale decimal[],
  id_pano int references Panos (id),
  id_skybox int references Skyboxs (id)
)
