data "terraform_remote_state" "this" {
  backend = var.src.backend
  config  = try(local.config, {})
}
