data "terraform_remote_state" "cognito_user_pool" {
  backend = var.src.backend
  config  = try(local.config_cognito_user_pool, {})
}

data "terraform_remote_state" "cognito_user_pool_client" {
  backend = var.src.backend
  config  = try(local.config_cognito_user_pool_client, {})
}

data "terraform_remote_state" "api_gateway_domain_name" {
  backend = var.src.backend
  config  = try(local.config_api_gateway_domain_name, {})
}

data "terraform_remote_state" "cognito_user_pool_domain" {
  backend = var.src.backend
  config  = try(local.config_cognito_user_pool_domain, {})
}
