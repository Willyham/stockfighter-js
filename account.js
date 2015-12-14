'use strict';

var extend = require('xtend');

var Client = require('./client');
var Types = require('./types');

function Account(key, account, venue) {
  this.key = key;
  this.account = account;
  this.venue = venue;

  this.client = new Client(key);
}

Account.prototype.limitBuy = function limitBuy(options) {
  var orderOptions = {
    stock: options.stock,
    price: options.price,
    qty: options.quantity,
    direction: Types.DIRECTION.BUY
  };
  var order = this.createOrder(orderOptions);
  return this.placeOrder(order);
};

Account.prototype.limitSell = function limitSell(options) {
  var orderOptions = {
    stock: options.stock,
    price: options.price,
    qty: options.quantity,
    direction: Types.DIRECTION.SELL
  };
  var order = this.createOrder(orderOptions);
  return this.placeOrder(order);
};

Account.prototype.createOrder = function createOrder(options) {
  //stock, price, qty, direction, orderType
  // TODO: validate order
  return extend({
    venue: this.venue,
    account: this.account,
    orderType: Types.ORDER_TYPES.LIMIT
  }, options);
};

Account.prototype.placeOrder = function placeOrder(order) {
  return this.client.placeOrder(order.venue, order.stock, order.account, order);
};

Account.prototype.listStocks = function listStocks() {
  return this.client.listStocks(this.venue);
};

Account.prototype.getOrderbook = function getOrderbook(stock) {
  return this.client.getOrderbook(this.venue, stock);
};

Account.prototype.getQuote = function getQuote(stock) {
  return this.client.getQuote(this.venue, stock);
};

Account.prototype.getOrderStatus = function getOrderStatus(stock, orderId) {
  return this.client.getOrderStatus(this.venue, stock, orderId);
};

Account.prototype.cancelOrder = function cancelOrder(stock, orderId) {
  return this.client.cancelOrder(this.venue, stock, orderId);
};

Account.prototype.getAccountOrders = function getAccountOrders(stock) {
  if (!stock) {
    return this.client.getAccountOrders(this.venue, this.account);
  }
  return this.client.getAccountOrdersForStock(this.venue, this.account, stock);
};
