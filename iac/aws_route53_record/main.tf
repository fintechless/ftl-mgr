resource "aws_route53_record" "this" {
  count   = local.ftl_domain == "" ? 0 : (data.aws_region.this.name == local.ftl_active) ? 1 : 0
  zone_id = data.aws_route53_zone.this[0].zone_id
  type    = "A"
  name    = local.ftl_fqdn_app

  alias {
    name                   = data.terraform_remote_state.aws_cloudfront_distribution.outputs.domain_name
    zone_id                = data.terraform_remote_state.aws_cloudfront_distribution.outputs.hosted_zone_id
    evaluate_target_health = false
  }
}
