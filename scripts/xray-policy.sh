#!/usr/bin/env bash

AWS_DEFAULT_REGION=eu-central-1
FUNCTION_NAME="serverless-pizzeria-api"
CLAUDIA_ROLE="serverless-pizzeria-api-executor"

aws iam \
  attach-role-policy \
  --policy-arn arn:aws:iam::aws:policy/AWSXrayWriteOnlyAccess \
  --role-name $CLAUDIA_ROLE  --region $AWS_DEFAULT_REGION \
  --output json

aws lambda \
  update-function-configuration \
  --function-name $FUNCTION_NAME \
  --tracing-config Mode=Active \
  --region $AWS_DEFAULT_REGION