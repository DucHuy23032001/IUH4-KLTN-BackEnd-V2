const { v4: UUIDV4 } = require('uuid')
const { S3Client, PutObjectCommand, CreateBucketCommand } = require("@aws-sdk/client-s3");
// Set the AWS Region.
const REGION = process.env.region; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
let s3Client = new S3Client({ region: REGION });

exports.saveOneFile = async (req, res, file) => {
  try {
    const params = {
      Bucket: "iuh4kltn", // The name of the bucket. For example, 'sample-bucket-101'.
      Key: UUIDV4() + file.name, // The name of the object. For example, 'sample_upload.txt'.
      Body: Buffer.from(file.data, "binary"), // The content of the object. For example, 'Hello world!".
    };
    try {
      const results = await s3Client.send(new PutObjectCommand(params));
      console.log(results.Location);
      console.log(
        "Successfully created " +
        params.Key +
        " and uploaded it to " +
        params.Bucket +
        "/" +
        params.Key
      );
      return results; // For unit tests.
    } catch (err) {
      console.log("Error", err);
    }

  } catch (error) {
    return res.status(500).json(error)
  }
}
