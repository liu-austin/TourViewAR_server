require("dotenv").config();
const aws = require('aws-sdk');
const s3 = new aws.S3({accessKeyId: process.env.ACCESSKEY, secretAccessKey: process.env.SECRETKEY, region: process.env.REGION});
const db = require('./index.js')

const getCountThenUrl = (req, callback) => {
    console.log(`you're in s3UploadHelper.getCountThenUrl`)
    db.query(`SELECT count(*) as total FROM Panos`, (err, results) => {
        if (err) {
            console.log(`error in getCountThenUrl`)
            callback(err)
        } else {
            console.log(results);
            getPreSignedUrl(req.params.bucket, results.rows[0].total, callback);
        }
    });
};


const getCountThenUrlForObject = (req, callback) => {
    console.log(`you're in s3UploadHelper.getCountThenUrlForObject`)
    db.query(`SELECT count(*) as total FROM Object`, (err, results) => {
        if (err) {
            console.log(`error in getCountThenUrl`)
            callback(err)
        } else {
            console.log(results);
            getPreSignedUrlForObject(req.params.bucket, results.rows[0].total, callback);
        }
    });
};

const getPreSignedUrl = (bucket, id, cb) => {
    const params = {Bucket: bucket, Key: `images/myimage${id}.jpg`, ContentType: 'image/jpeg'};
    s3.getSignedUrl('putObject', params, function(err, url) {
        if (err) {
            console.log(err);
            cb(err);
        } else {
            console.log('Your generated pre-signed URL is', url);
            db.query(`INSERT INTO Panos VALUES (${id}, 'https://${bucket}.s3-us-west-1.amazonaws.com/images/myimage${id}.jpg')`, (err, results) => {
                if (err) {
                    cb(err);
                } else {
                    cb(null, url);
                }
            });
        }
    });
};
// const getPreSignedUrlForSkybox = (index, id, cb) => {
//     const params = {Bucket: 'skyboximages', Key: `images/myimage${id}-${index}.jpg`, ContentType: 'image/jpeg'};
//     s3.getSignedUrl('putObject', params, function(err, url) {
//         if (err) {
//             console.log(err);
//             cb(err);
//         } else {
//             console.log('Your generated pre-signed URL is', url);
//             db.query(`INSERT INTO Panos VALUES (${id}, 'https://panoimages.s3-us-west-1.amazonaws.com/images/myimage${id}-${index}.jpg')`, (err, results) => {
//                 if (err) {
//                     cb(err);
//                 } else {
//                     cb(null, url);
//                 }
//             });
//         }
//     });
// };

const getPreSignedUrlForObject = (bucket, id, cb) => {
    const params = {Bucket: bucket, Key: `images/myimage${id}.jpg`, ContentType: 'image/jpeg'};
    s3.getSignedUrl('putObject', params, function(err, url) {
        if (err) {
            console.log(err);
            cb(err);
        } else {
            console.log('Your generated pre-signed URL is', url);
            db.query(`INSERT INTO Objects VALUES (${id}, 'https://${bucket}.s3-us-west-1.amazonaws.com/images/myimage${id}.jpg')`, (err, results) => {
                if (err) {
                    cb(err);
                } else {
                    cb(null, url);
                }
            });
        }
    });
};

module.exports = {
                    getCountThenUrl,
                    getCountThenUrlForObject
                };
// module.exports = getPreSignedUrl;