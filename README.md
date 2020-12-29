# serverless-pizzeria-api

Project for the book "Serverless Applications with Node.js - Using AWS Lambda and Claudia.js", using ES6.


## AWS, Env Variables

pip install awscli

aws configure

$ export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
   # The access key for your AWS account.
$ export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
   # The secret access key for your AWS account.

## Requests

curl -i -H "Content-Type: application/json" -X POST \
 -d '{"pizzaId":1,"address":"221B Baker Street"}' \
 https://j0jx7d4u8b.execute-api.eu-central-1.amazonaws.com/latest/orders