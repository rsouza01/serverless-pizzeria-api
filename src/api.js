'use strict'

const Api = require('claudia-api-builder');
const api = new Api();

const getPizzas = require('./handlers/get-pizzas')

const createOrder = require('./handlers/create-order')
const getOrders = require('./handlers/get-order')
const updateOrder = require('./handlers/update-order')
const deleteOrder = require('./handlers/delete-order')

const updateDeliveryStatus = require('./handlers/update-delivery-status')

api.get('/', () => 'Welcome to Pizza API')

api.get('/pizzas', () => {
    return getPizzas()
})
api.get('/pizzas/{id}', (request) => {
    return getPizzas(request.pathParams.id)
}, {
    error: 404
})

api.post('/orders', (request) => {
    return createOrder(request.body)
}, {
    success: 201,
    error: 400
})

api.get('/orders', () => {
    return getOrders()
})

api.get('/orders/{id}', (request) => {
    return getOrders(request.pathParams.id)
}, {
    error: 404
})

api.put('/orders/{id}', (request) => {
    return updateOrder(request.pathParams.id, request.body)
}, {
    error: 400
})

api.delete('/orders/{id}', (request) => deleteOrder(request.pathParams.id), {
    success: 200,
    error: 400
})

api.post('/delivery', (request) => updateDeliveryStatus(request.body), {
    success: 200,
    error: 400
})


module.exports = api;