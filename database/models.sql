DROP DATABASE IF EXISTS tourmvp;

CREATE DATABASE tourmvp;

\c tourmvp;

CREATE TABLE Users (
  id serial unique,
  email varchar(255),
  username varchar(255),
  pw varchar(255),
  profile_pic_url varchar(255),
  created_tours int[]
)

CREATE TABLE Tours (
  id serial unique,
  tour_name varchar(255),
  pano_photos int[],
  id_user int references Users (id)
)

CREATE TABLE Panos (
  id serial unique,
  img_url varchar(255)
)

CREATE TABLE Objects (
  id serial unique,
  x decimal,
  y decimal,
  object_value varchar(255),
  scale decimal[],
  id_pano int references Panos (id)
)