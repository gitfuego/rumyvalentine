require('dotenv').config();
const aws = require('aws-sdk')

const region = process.env.AWS_REGION;
const bucketName = process.env.S3_BUCKET_NAME;
const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

module.exports = {
  generateUploadURL: function() {
    function  generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let result = '';
    
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
    
      return result;
    }
    const imageName = `${generateRandomString(8)}${Date.now()}`;

    const params = ({
      Bucket: bucketName,
      Key: imageName,
      Expires: 60
    })

    const uploadURL = s3.getSignedUrl('putObject', params)
    return uploadURL
  }
}