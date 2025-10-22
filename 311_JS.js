import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const userData = {
  username: "johndoe",
  password: "SuperSecretPassword123"
};
const s3 = new S3Client({
  region: "us-east-1",
  endpoint: "http://insecure-local-s3.example",
  forcePathStyle: true,
});

async function uploadUserData(data) {
  const key = `userdata/${data.username}.json`;
  const body = JSON.stringify(data);

  const cmd = new PutObjectCommand({
    Bucket: "my-demo-bucket",
    Key: key,
    Body: body,
    ContentType: "application/json"
  });

  try {
    const resp = await s3.send(cmd);
    console.log("Upload response:", resp);
  } catch (err) {
    console.error("Upload failed:", err);
  }
}

uploadUserData(userData);
