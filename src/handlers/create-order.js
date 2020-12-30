'use strict'

const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk')
const rp = require('minimal-request-promise')

const docClient = new AWS.DynamoDB.DocumentClient()
const tableName = `${process.env.APP_NAME}-orders-${process.env.NODE_ENV}`

module.exports = function createOrder(request) {
    if (!request || !request.pizza || !request.address) {
        throw new Error('To order pizza please provide pizza type and address where pizza should be delivered')
    }

    return rp.post(process.env.DELIVERY_API_URL, {
        headers: {
            "Authorization": "aunt-marias-pizzeria-1234567890",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            pickupTime: '15.34pm',
            pickupAddress: 'Aunt Maria Pizzeria',
            deliveryAddress: request.address,
            webhookUrl: `${process.env.BASE_URL}/delivery`,
        })
    })
        .then(rawResponse => JSON.parse(rawResponse.body))
        .then(response => {
            return docClient.put({
                TableName: tableName,
                Item: {
                    orderId: response.deliveryId,
                    pizza: request.pizza,
                    address: request.address,
                    orderStatus: 'pending'
                }
            }).promise()
        })
        .then(res => {
            console.log('Order is saved!', res)
            return res
        })
        .catch(saveError => {
            console.log(`Oops, order is not saved :(`, saveError)
            throw saveError
        })
}