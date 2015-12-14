# stockfighter-js

A simple stockfighter.io JavaScript client.

## Install

  npm install --save stockfighter-js

## Usage

```JavaScript
var Stockfighter = require('stockfighter-js');

var account = new Stockfighter.Account("apiKey", "venue", "account");

var stock = 'FOOBAR';
var myOrder = {
  stock: stock
  price: 1000,
  quantity: 25
};

account.limitBuy(myOrder)
  .then(function onOrder(order) {
    return order.id;
  })
  .then(function checkStatus(id) {
    return account.getOrderStatus(stock, id);
  });
```

## API

This module exposes Account which can be used for high level functions on an
account/venue pair. It also exposed Client which is the underlying client object
which has 1:1 parity with the Stockfighter API.

## TODO

Tests and more high level functions
