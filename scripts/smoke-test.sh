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
curl -i -H "Content-Type: application/json" -X PUT \
  -d '{"pizza":2}' \
  $BASE_URL/orders/42

echo
echo '*****************************************************************'
echo 'DELETE'
echo '*****************************************************************'
curl -i -H "Content-Type: application/json" -X DELETE \
  $BASE_URL/orders/42

echo
