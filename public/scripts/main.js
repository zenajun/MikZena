'use strict';

/*
Start with users quiz ask for their location(store), budget(product) and poison(product)
Grab that data and store it in variables
Get the product data and use the stored variables to get the data we need.
Get the Product id and use that to find the Store


*/

// App
var app = {};

app.getProduct = function () {
  // Mikaela
  return $.ajax({
    url: 'http://lcboapi.com/products',
    dataType: 'jsonp',
    method: 'GET',
    headers: { Authorization: Token = 'MDpjYzUzZmIyZS01MjRjLTExZTgtODEyNy1jMzA5ZjdlMWFjN2I6VVJVT3V0NTlWSXAyTU42MXp3V0xja0dSVmJ4YVhhd014bm1k' },
    data: {
      // q: 
    }
  }).then(function (res) {
    console.log(res);
  });
};

app.getStore = function () {// Zena

};

app.init = function () {} // Everything gets called inside of this function


// Document ready
;$(function () {
  app.init(); // <-- we don't need to touch this
});