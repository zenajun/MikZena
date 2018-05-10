'use strict';

/*
Start with users quiz ask for their location(store), budget(product) and poison(product)
Grab that data and store it in variables
Get the product data and use the stored variables to get the data we need.
Get the Product id and use that to find the Store
*/

// App
var app = {};

app.key = 'MDpjYzUzZmIyZS01MjRjLTExZTgtODEyNy1jMzA5ZjdlMWFjN2I6VVJVT3V0NTlWSXAyTU42MXp3V0xja0dSVmJ4YVhhd014bm1k';

app.getProduct = function (store, drink) {
    // Mikaela
    return $.ajax({
        url: 'http://lcboapi.com/products?&store_id=511&per_page=100',
        dataType: 'jsonp',
        method: 'GET',
        headers: { Authorization: app.key }
    }).then(function (drink) {
        //   console.log(drink);

        //   console.log(drink.result);
        var listOfDrinks = drink.result;
        var drinkChoices = [];
        listOfDrinks.filter(function (drink) {
            // console.log(drink.primary_category);
            // if (drink.primary_category === 'Wine') {
            //     // console.log(drink.secondary_category);

            // }
            if (drink.primary_category === "Beer" && drink.regular_price_in_cents > 5000 && drinkChoices.length < 5) {
                drinkChoices.push(drink);
            }
            // console.log(drinkChoices);

        });
    });
}; // productid end


app.getStores = function (geo) {
    return $.ajax({
        url: 'http://lcboapi.com/stores?&geo=' + geo,
        headers: {
            Authorization: app.key
        },
        contentType: 'application/json',
        dataType: 'jsonp'
    }).then(function (store) {
        var $store = store.result[0]; // Get the nearest store
        console.log($store.name, $store.id);
    });
};

app.events = function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
        var $postalCode = $('#postalCode').val();
        app.getStores($postalCode);

        var selectedDrink = $('.selectDrink input[type="radio"]:checked').attr('value');
        app.getProduct(selectedDrink);
        console.log(selectedDrink);
    });
}; //on click end


app.init = function () {
    // Everything gets called inside of this function
    app.events();
    app.getProduct();
    app.getPrice();
};

// Document ready
$(function () {
    app.init(); // <-- we don't need to touch this
});