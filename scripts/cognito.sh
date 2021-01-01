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

# PoolId: eu-central-1_iW3b75tTy
# ClientId: 3ti755qg5vglksu816eo77bigv

# aws cognito-identity create-identity-pool \
#     --identity-pool-name Pizzeria \
#     --allow-unauthenticated-identities \
#     --cognito-identity-providers ProviderName=cognito-idp.eu-central-1.amazonaws.com/eu-central-1_iW3b75tTy,ClientId=3ti755qg5vglksu816eo77bigv,ServerSideTokenCheck=false \
#     --query IdentityPoolId \
#     --output text

# Identity pool Id: eu-central-1:3b925a0b-7f41-47bf-afcd-1e1e334a410e



# aws iam create-role --role-name $APP_NAME-Role-auth --assume-role-policy-document file://AUTH-Role-Trust-Policy.json
#"arn:aws:iam::491406350155:role/SLS-PIZZA-Role-auth",

# aws iam create-role --role-name $APP_NAME-Role-unauth --assume-role-policy-document file://UNAUTH-Role-Trust-Policy.json
# arn:aws:iam::491406350155:role/SLS-PIZZA-Role-unauth

# aws cognito-identity set-identity-pool-roles \
# --identity-pool-id eu-central-1:3b925a0b-7f41-47bf-afcd-1e1e334a410e \
# --roles authenticated=arn:aws:iam::491406350155:role/SLS-PIZZA-Role-auth,unauthenticated=arn:aws:iam::491406350155:role/SLS-PIZZA-Role-unauth