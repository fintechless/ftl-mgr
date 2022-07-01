locals {
  config_cognito_user_pool = {
    region = data.aws_region.this.name
    bucket = local.ftl_bucket
    key    = var.src.config_cognito_user_pool_key
  }

  config_cognito_user_pool_client = {
    region = data.aws_region.this.name
    bucket = local.ftl_bucket
    key    = var.src.config_cognito_user_pool_client_key
  }

  config_api_gateway_domain_name = {
    region = data.aws_region.this.name
    bucket = local.ftl_bucket
    key    = var.src.config_api_gateway_domain_name_key
  }

  config_cognito_user_pool_domain = {
    region = data.aws_region.this.name
    bucket = local.ftl_bucket
    key    = var.src.config_cognito_user_pool_domain_key
  }
}
