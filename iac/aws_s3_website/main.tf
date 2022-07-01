resource "aws_s3_bucket" "this" {
  bucket = local.name

  force_destroy = var.src.force_destroy

  tags = merge(var.tags, { Name = local.name })
}

resource "aws_s3_bucket_cors_configuration" "this" {
  bucket = aws_s3_bucket.this.bucket

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["HEAD", "GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 0
  }
}

resource "aws_s3_bucket_policy" "this" {
  bucket = aws_s3_bucket.this.id
  policy = templatefile("${path.module}/template/assume_policy.json.tpl",
    {
      S3_BUCKET_ARN     = aws_s3_bucket.this.arn
      CLOUDRONT_OAI_ARN = data.terraform_remote_state.this.outputs.iam_arn
    }
  )
}

resource "aws_secretsmanager_secret_version" "this" {
  depends_on = [aws_s3_bucket.this]
  secret_id  = data.aws_secretsmanager_secret.this.id
  secret_string = jsonencode(merge(local.ftl_cicd_secret_map, {
    FTL_FQDN_APP = local.ftl_domain == "" ? format("%s.%s", local.ftl_env == "default" ? local.ftl_subdomain_app : "${local.ftl_subdomain_app}-${local.ftl_env}", local.ftl_domain) : aws_s3_bucket.this.bucket_regional_domain_name
  }))
}
