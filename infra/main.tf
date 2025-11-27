terraform {
  required_version = ">= 1.3.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

#########################
# ECR Repositories
#########################

resource "aws_ecr_repository" "catalogs" {
  name                 = "${var.project_prefix}-catalogs"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_repository" "sales" {
  name                 = "${var.project_prefix}-sales"
  image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_repository" "notifications" {
  name                 = "${var.project_prefix}-notifications"
  image_tag_mutability = "MUTABLE"
}

#########################
# DynamoDB Tables
#########################

resource "aws_dynamodb_table" "customers" {
  name         = "${var.project_prefix}-customers"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "addresses" {
  name         = "${var.project_prefix}-addresses"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "products" {
  name         = "${var.project_prefix}-products"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "sales" {
  name         = "${var.project_prefix}-sales"
  billing_mode = "PAY_PER_REQUEST"

  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

#########################
# SNS Topic
#########################

resource "aws_sns_topic" "sales_notifications" {
  name = "${var.project_prefix}-sales-notifications"
}

#########################
# Outputs (para conectar con ECS)
#########################

output "ecr_catalogs_repo_url" {
  value = aws_ecr_repository.catalogs.repository_url
}

output "ecr_sales_repo_url" {
  value = aws_ecr_repository.sales.repository_url
}

output "ecr_notifications_repo_url" {
  value = aws_ecr_repository.notifications.repository_url
}

output "dynamodb_customers_table_name" {
  value = aws_dynamodb_table.customers.name
}

output "dynamodb_addresses_table_name" {
  value = aws_dynamodb_table.addresses.name
}

output "dynamodb_products_table_name" {
  value = aws_dynamodb_table.products.name
}

output "dynamodb_sales_table_name" {
  value = aws_dynamodb_table.sales.name
}

output "sns_notifications_topic_arn" {
  value = aws_sns_topic.sales_notifications.arn
}
