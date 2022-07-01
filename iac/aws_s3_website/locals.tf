locals {
  name = format("%s-%s-%s-%s", var.src.name_prefix, local.ftl_env, data.aws_region.this.name, data.aws_caller_identity.this.account_id)

  config = {
    region = data.aws_region.this.name
    bucket = local.ftl_bucket
    key    = var.src.config_key
  }
}
