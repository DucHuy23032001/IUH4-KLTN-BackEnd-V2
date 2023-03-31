const { v4: UUIDV4 } = require('uuid')
const AWS = require("aws-sdk");

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secketAccessKey = process.env.SECKET_ACCESS_KEY

AWS.config.update({
  accessKeyId: accessKey,
  secretAccessKey: secketAccessKey,
  region: bucketRegion,
});
const s3 = new AWS.S3();

exports.uploadFileToS3= async (req,res , file) => {
  try {
    // console.log(file);
    const _fileLinkClient = file;
    const _fileContent = Buffer.from(_fileLinkClient.data, "binary");
    const _param = {
      Bucket: "iuh4kltn",
      Key: _fileLinkClient.name,
      Body: _fileContent,
    }
    const _paramFileLocation = await s3
      .upload(_param, (err, data) => {
        if (err) {
          throw err;
        }
      })
      .promise();
    return _paramFileLocation.Location;
  } catch (error) {
    
  }
}