#!/usr/bin/env bash

AWS_DEFAULT_REGION=eu-central-1

# aws logs describe-log-groups --region $AWS_DEFAULT_REGION

aws logs \
  filter-log-events \
  --filter='Save an order' \
  --log-group-name=/aws/lambda/serverless-pizzeria-api \
  --query='events[0].message' \
  --region=$AWS_DEFAULT_REGION \
  --output=text