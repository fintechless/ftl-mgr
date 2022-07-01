data "aws_acm_certificate" "this" {
  count  = local.ftl_domain == "" ? 0 : 1
  domain = local.ftl_domain
}

data "terraform_remote_state" "bucket_active" {
  backend = var.src.backend
  config  = try(local.config_active, {})
}

data "terraform_remote_state" "bucket_passive" {
  backend = var.src.backend
  config  = try(local.config_passive, {})
}

data "terraform_remote_state" "aws_cloudfront_oai" {
  backend = var.src.backend
  config  = try(local.config_oai, {})
}

data "terraform_remote_state" "aws_cloudfront_distribution" {
  count   = (data.aws_region.this.name == local.ftl_passive) ? 1 : 0
  backend = var.src.backend
  config  = try(local.config_cloudfront, {})
}
