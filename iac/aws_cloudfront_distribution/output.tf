output "domain_name" {
  value = try(aws_cloudfront_distribution.this[0].domain_name, try(data.terraform_remote_state.aws_cloudfront_distribution[0].outputs.domain_name, ""))
}

output "hosted_zone_id" {
  value = try(aws_cloudfront_distribution.this[0].hosted_zone_id, try(data.terraform_remote_state.aws_cloudfront_distribution[0].outputs.hosted_zone_id, ""))
}
