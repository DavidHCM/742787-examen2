variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_prefix" {
  description = "Prefijo para nombrar recursos (ej. examen2)"
  type        = string
  default     = "examen2"
}
