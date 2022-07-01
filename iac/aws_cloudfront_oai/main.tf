resource "aws_cloudfront_origin_access_identity" "this" {
  count   = (data.aws_region.this.name == local.ftl_active) ? 1 : 0
  comment = var.src.comment
}
