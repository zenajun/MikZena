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

app.getProduct = function (store) {
    // filter through the whole product array
    return $.ajax({
        url: 'http://lcboapi.com/products?&per_page=100&=' + store,
        dataType: 'jsonp',
        method: 'GET',
        headers: { Authorization: app.key }
    }).then(function (res) {
        console.log(res.result);

        console.log(res.result);
        var listOfDrinks = res.result;
        // const drinkChoices = [];
        listOfDrinks.filter(function (drink) {
            // console.log(drink.primary_category);
            if (drink.primary_category === 'Ciders') {
                console.log(drink.price_in_cents);
            }
            // if (drink.primary_category === "Beer" ) {
            //     drinkChoices.push(drink)           
            // }
            // console.log(drinkChoices);     

        });
    });
}; // productid end

// this finds the closest store based on postal code, get the  store on submit of the app.events
app.getStores = function (geo) {
    return $.ajax({
        url: 'http://lcboapi.com/stores?&geo=' + geo,
        headers: {
            Authorization: app.key
        },
        contentType: 'application/json',
        dataType: 'jsonp'
    }).then(function (res) {

        var store = res.result[0]; // Get the nearest store
        console.log(store);

        console.log(store.id);
        app.getProduct(store.id);
    });
};

app.events = function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
        var $postalCode = $('#postalCode').val().replace(' ', '+'); // Grab users postal code        
        app.getStores($postalCode); // Finds the closest store


        var selectedDrink = $('.selectDrink input[type="radio"]:checked').attr('value');
        app.getProduct(selectedDrink);
        console.log(selectedDrink);
    });
}; //on click end


app.init = function () {
    // Everything gets called inside of this function
    // app.events();
    app.getProduct(685);
};

// Document ready
$(function () {
    app.init(); // <-- we don't need to touch this
});