output "id" {
  value = try(aws_cloudfront_origin_access_identity.this[0].id, try(data.terraform_remote_state.aws_cloudfront_oai[0].outputs.id, ""))
}

output "iam_arn" {
  value = try(aws_cloudfront_origin_access_identity.this[0].iam_arn, try(data.terraform_remote_state.aws_cloudfront_oai[0].outputs.iam_arn, ""))
}

output "cloudfront_access_identity_path" {
  value = try(aws_cloudfront_origin_access_identity.this[0].cloudfront_access_identity_path, try(data.terraform_remote_state.aws_cloudfront_oai[0].outputs.cloudfront_access_identity_path, ""))
}
