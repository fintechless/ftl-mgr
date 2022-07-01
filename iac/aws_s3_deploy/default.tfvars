src = {
  backend                             = "s3"
  config_cognito_user_pool_key        = "terraform/fintechless/ftl-api/aws_cognito_user_pool/terraform.tfstate"
  config_cognito_user_pool_client_key = "terraform/fintechless/ftl-api/aws_cognito_user_pool_client/terraform.tfstate"
  config_api_gateway_domain_name_key  = "terraform/fintechless/ftl-api/aws_api_gateway_domain_name/terraform.tfstate"
  config_cognito_user_pool_domain_key = "terraform/fintechless/ftl-api/aws_cognito_user_pool_domain/terraform.tfstate"
  key_path                            = "deploy/fintechless/ftl-mgr/default/.env"
}
