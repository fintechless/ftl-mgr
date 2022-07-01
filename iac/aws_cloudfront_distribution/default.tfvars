src = {
  backend               = "s3"
  config_key_bucket     = "terraform/fintechless/ftl-mgr/aws_s3_website/terraform.tfstate"
  config_key_oai        = "terraform/fintechless/ftl-mgr/aws_cloudfront_oai/terraform.tfstate"
  config_key_cloudfront = "terraform/fintechless/ftl-mgr/aws_cloudfront_distribution/terraform.tfstate"

  max_ttl     = 31536000
  min_ttl     = 0
  default_ttl = 86400
}

tags = {
  Description = "CloudFront Distribution for FTL MGR"
}
