#!/usr/bin/env bash

echo '#################################################################'
echo 'SMOKE TEST'
echo '#################################################################'


BASE_URL=https://j0jx7d4u8b.execute-api.eu-central-1.amazonaws.com/latest/

echo
echo '*****************************************************************'
echo 'POST'
echo '*****************************************************************'
curl -i -H "Content-Type: application/json" -X POST \
  -d '{"pizza":1,"address":"221B Baker Street"}' \
  $BASE_URL/orders


echo
echo '*****************************************************************'
echo 'PUT'
echo '*****************************************************************'
curl -i  -H "Content-Type: application/json"  -X PUT \
  -d '{"pizza": 3, "address": "UPDATED"}' \
  $BASE_URL/orders/062c82ca-15e3-4ebb-a60b-459b88cf9135


echo
echo '*****************************************************************'
echo 'DELETE'
echo '*****************************************************************'
curl -i -H "Content-Type: application/json" -X DELETE \
  $BASE_URL/orders/4f8acf45-20e4-4818-9cd3-10b77872c972

echo
echo '*****************************************************************'
echo 'GET ALL'
echo '*****************************************************************'
curl -i -H "Content-Type: application/json" \
$BASE_URL/orders

echo
echo '*****************************************************************'
echo 'GET'
echo '*****************************************************************'
curl -i -H "Content-Type: application/json" \
$BASE_URL/orders/e5304e07-a93c-46a3-9505-8934b6f8a0ef

echo

