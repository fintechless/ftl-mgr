src = {
  backend    = "s3"
  config_key = "terraform/fintechless/ftl-mgr/aws_cloudfront_oai/terraform.tfstate"

  name_prefix   = "ftl-api-mgr"
  acl           = "private"
  force_destroy = false
  versioning    = false
}

tags = {
  Description = "S3 Bucket for FTL MGR"
}
