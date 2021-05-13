# ViewTourAR Server

ViewTourAR is an AR mobile app for Android and IOS. This repo contains the backend code is currently deployed on AWS EBS. The link for the downloadable client-side application is located [here](https://github.com/liu-austin/TourViewARClient_alpha).

## Technologies

ViewTourAR was made using React Native CLI, ViroMedia SDK for AR, and Redux.

The backend server was built with Node.js, Express, PostgreSQL, and deployed using AWS EBS for remote access. Images for AR scenes and objects are uploaded and hosted by AWS S3. The PostgreSQL database is hosted on AWS EC2.

## Installation

```sh
git clone https://github.com/liu-austin/TourViewAR_server.git
cd tourViewARServer_alpha
npm install
npm start
```
