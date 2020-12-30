#!/usr/bin/env bash

NODE_ENV='test'
APP_NAME='SLS-PIZZA'

AWS_DEFAULT_REGION='eu-central-1'

# aws cognito-idp create-user-pool \
#     --pool-name Pizzeria \
#     --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=false,RequireLowercase=false,RequireNumbers=false,RequireSymbols=false}" \
#     --username-attributes email \
#     --query UserPool.Id \
#     --output text

# aws cognito-idp create-user-pool-client \
#     --user-pool-id eu-central-1_iW3b75tTy \
#     --client-name PizzeriaClient \
#     --no-generate-secret \
#     --query UserPoolClient.ClientId \
#     --output text



PoolId: eu-central-1_iW3b75tTy
ClientId: 3ti755qg5vglksu816eo77bigv