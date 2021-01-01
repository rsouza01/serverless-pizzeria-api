'use strict'

const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))

const rp = require('minimal-request-promise')

const docClient = new AWS.DynamoDB.DocumentClient()
const tableName = `${process.env.APP_NAME}-orders-${process.env.NODE_ENV}`

module.exports = function createOrder(request) {
    console.log('Save an order =>', request);
    const userData = request.context.authorizer.claims
    console.log('User data', userData)

    if (!request || !request.pizza || !request.address) {
        throw new Error('To order pizza please provide pizza type and address where pizza should be delivered')
    }

    let userAddress = request.body && request.body.address
    if (!userAddress) {
        userAddress = JSON.parse(userData.address).formatted
    }

    const requestDeliveryBody = {
        pickupTime: '15.34pm',
        pickupAddress: 'Aunt Maria Pizzeria',
        deliveryAddress: userAddress,
        webhookUrl: `${process.env.BASE_URL}/delivery`,
    }

    return rp.post(process.env.DELIVERY_API_URL, {
        headers: {
            "Authorization": "aunt-marias-pizzeria-1234567890",
            "Content-type": "application/json"
        },
        body: JSON.stringify(requestDeliveryBody)
    })
        .then(rawResponse => JSON.parse(rawResponse.body))
        .then(response => {
            return docClient.put({
                TableName: tableName,
                Item: {
                    cognitoUsername: userAddress['cognito:username'],
                    orderId: response.deliveryId,
                    pizza: request.pizza,
                    address: userAddress,
                    orderStatus: 'pending'
                }
            }).promise()
        })
        .then(res => {
            console.log('Order is saved!', res, requestDeliveryBody)
            return res
        })
        .catch(saveError => {
            console.log(`Oops, order is not saved :(`, saveError)
            throw saveError
        })
}