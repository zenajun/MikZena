'use strict';

/*
Start with users quiz ask for their location(store), budget(product) and poison(product)
Grab that data and store it in variables
Get the product data and use the stored variables to get the data we need.
Get the Product id and use that to find the Store


*/

// App
var app = {};
app.postal = 'm5s+2j6';

app.key = 'MDpjYzUzZmIyZS01MjRjLTExZTgtODEyNy1jMzA5ZjdlMWFjN2I6VVJVT3V0NTlWSXAyTU42MXp3V0xja0dSVmJ4YVhhd014bm1k';

app.getProduct = function () {
    // Mikaela
    return $.ajax({
        url: 'http://lcboapi.com/products?',
        dataType: 'jsonp',
        method: 'GET',
        headers: { Authorization: app.key },
        data: {
            primary_category: 'Beer'
        }
    }).then(function (res) {
        console.log(res);
    });
};

app.getStore = function (geo) {
    // Zena  
    return $.ajax({
        url: 'http://lcboapi.com/stores?&geo=' + geo,
        headers: {
            Authorization: app.key
        },
        contentType: 'application/json',
        dataType: 'jsonp'
    }).then(function (store) {
        // grab the first 5 nearest LCBO stores
        for (var i = 0; i < 5; i++) {
            //    console.log(store.result);
            var $store = store.result[i];
            console.log($store.name, $store.id);
        }
    });
};

app.events = function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
        var $postalCode = $('#postalCode').val();
        app.getStore($postalCode);

        var getProduct = $('.selectDrink input[type="radio"]').val();
        //5 passin the value from the method getJokes to 
        app.getProduct(getProduct);
        console.log(getProduct);
    });
};

app.init = function () {
    // Everything gets called inside of this function
    app.events();
    app.getProduct();
    // app.getStore();    
};

// Document ready
$(function () {
    app.init(); // <-- we don't need to touch this
});