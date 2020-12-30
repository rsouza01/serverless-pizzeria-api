#!/usr/bin/env bash

NODE_ENV='test'
APP_NAME='SLS-PIZZA'

AWS_DEFAULT_REGION='eu-central-1'

CLAUDIA_ROLE="serverless-pizzeria-api-executor"

TABLE_NAME_PIZZA_ORDERS="$APP_NAME-orders-$NODE_ENV"

echo 'Deleting table...'
aws dynamodb delete-table --table-name $TABLE_NAME_PIZZA_ORDERS
sleep 5

echo 'Creating table...'
aws dynamodb create-table --table-name $TABLE_NAME_PIZZA_ORDERS \
    --attribute-definitions AttributeName=orderId,AttributeType=S \
    --key-schema AttributeName=orderId,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
    --region $AWS_DEFAULT_REGION \
    --query TableDescription.TableArn

sleep 5

echo 'Adding policy...'
aws iam put-role-policy \
--role-name $CLAUDIA_ROLE \
--policy-name $APP_NAME-PizzaApiDynamoDB \
--policy-document file://./dynamodb-role.json


echo 'Done!'