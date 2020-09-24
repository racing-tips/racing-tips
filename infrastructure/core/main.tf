variable "env" {}
variable "aws_region" {}

provider "aws" {
  #  assume_role {
  #   role_arn = "${var.aws_role}"
  #   session_name = "non-prod"
  # }

  region = var.aws_region
}

terraform {
  backend "s3" {
    bucket         = "racing-tips-state"
    key            = "terraform.tfstate"
    region         = "eu-west-1"
    encrypt        = true
    # role_arn       = "arn:aws:iam::282161160489:role/BuildkiteWealthTerraformRole" # can't use string interpolation in backend block
  }
}

module "dynamodb_table" {
  source   = "terraform-aws-modules/dynamodb-table/aws"

  name     = "racing-tips"
  hash_key = "id"

  attributes = [
    {
      name = "id"
      type = "N"
    }
  ]

  tags = {
    Terraform   = "true"
    Environment = "${var.env}"
  }
}

resource "aws_iam_policy" "policy" {
  name        = "DynamoDBRacingTipsWrite"
  description = "Policy for use by Lambdas to write to DynamoDB racing tips table"

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DynamoDBRacingTipsWrite",
            "Effect": "Allow",
            "Action": "dynamodb:PutItem",
            "Resource": "arn:aws:dynamodb:eu-west-1:256440694439:table/racing-tips"
        }
    ]
}
EOF
}

