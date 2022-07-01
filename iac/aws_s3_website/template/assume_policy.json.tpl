{
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContent",
    "Statement": [
        {
            "Sid": "1",
            "Effect": "Allow",
            "Principal": {
                "AWS": "${CLOUDRONT_OAI_ARN}"
            },
            "Action": "s3:GetObject",
            "Resource": "${S3_BUCKET_ARN}/*"
        }
    ]
}
