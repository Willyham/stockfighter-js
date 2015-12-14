'use strict';

var urljoin = require('url-join');
var rest = require('rest');
var pathPrefix = require('rest/interceptor/pathPrefix');
var defaultRequest = require('rest/interceptor/defaultRequest');
var mime = require('rest/interceptor/mime');

function Client(key) {
  this.key = key;

  this.client = rest
    .wrap(pathPrefix, {
      prefix: 'https://api.stockfighter.io/ob/api/'
    })
    .wrap(defaultRequest, {
      headers: {
        'X-Starfighter-Authorization': this.key
      }
    })
    .wrap(mime, {
      mime: 'application/json'
    });
}

Client.prototype.heartbeat = function heartbeat() {
  var request = {
    path: 'heartbeat'
  };
  return this._makeRequest(request);
};

Client.prototype.heartbeatVenue = function heartbeatVenue(venue) {
  var request = {
    path: urljoin('venues', venue, 'heartbeat')
  };
  return this._makeRequest(request);
};

Client.prototype.listStocks = function listStocks(venue) {
  var request = {
    path: urljoin('venues', venue, 'stocks')
  };
  return this._makeRequest(request);
};

Client.prototype.getOrderbook = function getOrderbook(venue, stock) {
  var request = {
    path: urljoin('venues', venue, 'stocks', stock)
  };
  return this._makeRequest(request);
};

Client.prototype.getQuote = function getQuote(venue, stock) {
  var request = {
    path: urljoin('venues', venue, 'stocks', stock, 'quote')
  };
  return this._makeRequest(request);
};

Client.prototype.getOrderStatus = function getOrderStatus(venue, stock, orderId) {
  var request = {
    path: urljoin('venues', venue, 'stocks', stock, 'orders', orderId)
  };
  return this._makeRequest(request);
};

Client.prototype.placeOrder = function placeOrder(venue, stock, account, options) {
  var order = {
    venue: venue,
    symbol: stock,
    account: account,
    price: options.price,
    qty: options.qty,
    direction: options.direction,
    orderType: options.orderType
  };

  var request = {
    path: urljoin('venues', venue, 'stocks', stock, 'orders'),
    method: 'post',
    entity: order
  };
  return this._makeRequest(request);
};

Client.prototype.cancelOrder = function cancelOrder(venue, stock, orderId) {
  var request = {
    path: urljoin('venues', venue, 'stocks', stock, 'orders', orderId),
    method: 'delete'
  };
  return this._makeRequest(request);
};

Client.prototype.getAccountOrders = function getAccountOrders(venue, account) {
  var request = {
    path: urljoin('venues', venue, 'account', account, 'orders')
  };
  return this._makeRequest(request);
};

Client.prototype.getAccountOrdersForStock = function getAccountOrdersForStock(venue, account, stock) {
  var request = {
    path: urljoin('venues', venue, 'account', account, 'stock', stock, 'orders')
  };
  return this._makeRequest(request);
};

Client.prototype._makeRequest = function _makeRequest(options) {
  return this.client(options);
};

module.exports = Client;
