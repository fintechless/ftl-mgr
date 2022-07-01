resource "aws_cloudfront_distribution" "this" {
  count = (data.aws_region.this.name == local.ftl_active) ? 1 : 0

  enabled = true
  aliases = toset(split(",", local.ftl_fqdn_app))
  comment = local.ftl_fqdn_app

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 403
    response_code         = 403
    response_page_path    = "/index.html"
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 404
    response_code         = 404
    response_page_path    = "/index.html"
  }

  default_root_object = "index.html"
  is_ipv6_enabled     = true
  http_version        = "http2"
  price_class         = "PriceClass_All"

  default_cache_behavior {
    # allowed_methods        = ["GET", "HEAD", "OPTIONS", "DELETE", "PATCH", "POST", "PUT"]
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    compress               = true
    max_ttl                = var.src.max_ttl
    default_ttl            = var.src.default_ttl
    min_ttl                = var.src.min_ttl
    target_origin_id       = local.ftl_fqdn_app
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      headers      = []
      query_string = false

      cookies {
        forward           = "none"
        whitelisted_names = []
      }
    }
  }

  origin {
    origin_id   = data.terraform_remote_state.bucket_active.outputs.bucket_regional_domain_name
    domain_name = data.terraform_remote_state.bucket_active.outputs.bucket_regional_domain_name
    origin_path = ""

    s3_origin_config {
      origin_access_identity = data.terraform_remote_state.aws_cloudfront_oai.outputs.cloudfront_access_identity_path
    }
  }

  origin {
    origin_id   = data.terraform_remote_state.bucket_passive.outputs.bucket_regional_domain_name
    domain_name = data.terraform_remote_state.bucket_passive.outputs.bucket_regional_domain_name
    origin_path = ""

    s3_origin_config {
      origin_access_identity = data.terraform_remote_state.aws_cloudfront_oai.outputs.cloudfront_access_identity_path
    }
  }

  origin_group {
    origin_id = local.ftl_fqdn_app

    failover_criteria {
      status_codes = [403, 404, 500, 502, 503, 504]
    }

    member {
      origin_id = data.terraform_remote_state.bucket_active.outputs.bucket_regional_domain_name
    }

    member {
      origin_id = data.terraform_remote_state.bucket_passive.outputs.bucket_regional_domain_name
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  dynamic "viewer_certificate" {
    for_each = local.ftl_domain == "" ? [] : [null]
    content {
      acm_certificate_arn      = data.aws_acm_certificate.this[0].arn
      ssl_support_method       = "sni-only"
      minimum_protocol_version = "TLSv1.1_2016"
    }
  }

  tags = merge(var.tags, { Name = local.ftl_fqdn_app })
}
