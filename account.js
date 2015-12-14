'use strict';

var Client = require('./client');
var Types = require('./types');

function Account(key, account, venue) {
  this.key = key;
  this.account = account;
  this.venue = venue;

  this.client = new Client(key);
}

Account.prototype.limitBuy = function limitBuy(symbol, price, quantity) {
  var order = this.createOrder(symbol, price, quantity, Types.DIRECTION.BUY);
  return this.placeOrder(order);
};

Account.prototype.limitSell = function limitSell(symbol, price, quantity) {
  var order = this.createOrder(symbol, price, quantity, Types.DIRECTION.SELL);
  return this.placeOrder(order);
};

Account.prototype.createOrder = function createOrder(stock, price, qty, direction, orderType) {
  return {
    venue: this.venue,
    account: this.account,
    stock: stock,
    price: price,
    qty: qty,
    direction: direction,
    orderType: orderType || Types.ORDER_TYPES.LIMIT
  };
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
