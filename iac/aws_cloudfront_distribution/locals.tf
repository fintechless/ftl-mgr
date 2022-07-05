locals {
  s3_active_origin_id  = "ftl-active-s3-origin"
  s3_passive_origin_id = "ftl-passive-s3-origin"

  config_active = {
    region = local.ftl_active
    bucket = replace(local.ftl_bucket, data.aws_region.this.name, local.ftl_active)
    key    = var.src.config_key_bucket
  }

  config_passive = {
    region = local.ftl_passive
    bucket = replace(local.ftl_bucket, data.aws_region.this.name, local.ftl_passive)
    key    = var.src.config_key_bucket
  }

  config_oai = {
    region = data.aws_region.this.name
    bucket = local.ftl_bucket
    key    = var.src.config_key_oai
  }

  config_cloudfront = {
    region = local.ftl_active
    bucket = replace(local.ftl_bucket, data.aws_region.this.name, local.ftl_active)
    key    = var.src.config_key_cloudfront
  }
}
