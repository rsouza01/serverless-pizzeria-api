const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

const { v4: uuidv4 } = require('uuid');

const tableName = `${process.env.APP_NAME}-orders-${process.env.NODE_ENV}`


function createOrder(request) {
    if (!request || !request.pizza || !request.address) {
        throw new Error('To order pizza please provide pizza type and address where pizza should be delivered')
    }
    return docClient.put({
        TableName: tableName,
        Item: {
            orderId: uuidv4(),
            pizza: request.pizza,
            address: request.address,
            orderStatus: 'pending'
        }
    }).promise()
        .then((res) => {
            console.log('Order is saved!', res)
            return res
        })
        .catch((saveError) => {
            console.log(`Oops, order is not saved :(`, saveError)
            throw saveError
        })
}

module.exports = createOrder