resource "aws_s3_object" "this" {
  key     = var.src.key_path
  bucket  = local.ftl_bucket
  content = <<EOF
VUE_APP_FTL_URL=https://${local.ftl_fqdn_app}
VUE_APP_FTL_COGNITO_REDIRECT_URI=https://${local.ftl_fqdn_app}/login/oauth2/code/cognito
VUE_APP_FTL_COGNITO_REDIRECT_URI_SIGNOUT=https://${local.ftl_fqdn_app}/logout
VUE_APP_FTL_COGNITO_APP_DOMAIN=${local.ftl_fqdn_auth}
VUE_APP_FTL_COGNITO_USERPOOL_ID=${data.terraform_remote_state.cognito_user_pool.outputs.id}
VUE_APP_FTL_COGNITO_CLIENT_ID=${data.terraform_remote_state.cognito_user_pool_client.outputs.ids["ftl-group-web-admin"]}
VUE_APP_FTL_API_URL=https://${local.ftl_fqdn_api}
VUE_APP_FTL_RESET_PASSWORD_REDIRECT_URI=${local.ftl_fqdn_app}
VUE_APP_FTL_REDIRECT_URI_PROTOCOL=https
VUE_APP_FTL_ACTIVITY_IDLE_TTL=900
VUE_APP_FTL_ACTIVITY_ALERT_TTL=30
EOF
}
