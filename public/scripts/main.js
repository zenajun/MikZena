'use strict';

/*
Start with users quiz ask for their location(store), budget(product) and poison(product)
Grab that data and store it in variables
Get the product data and use the stored variables to get the data we need.
Get the Product id and use that to find the Store

*/
// object with two arrays, the values of the selections that users can make

// App
var app = {};

app.userOptions = {
    wine: [{
        option: 'Budget',
        lowpoint: 0,
        highpoint: 999
    }, {
        option: 'Cheap',
        lowpoint: 1000,
        highpoint: 1999
    }, {
        option: 'Pricy',
        lowpoint: 2000,
        highpoint: 3999
    }, {
        option: 'Expensive',
        lowpoint: 4000,
        highpoint: 200000
    }],
    brew: [{
        option: 'Budget',
        lowpoint: 0,
        highpoint: 399
    }, {
        option: 'Cheap',
        lowpoint: 400,
        highpoint: 1999
    }, {
        option: 'Pricy',
        lowpoint: 2000,
        highpoint: 3499
    }, {
        option: 'Expensive',
        lowpoint: 3500,
        highpoint: 100000
    }]
};

app.finalOptions = [];
console.log(app.finalOptions);

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

        //   console.log(drink.result);
        var listOfDrinks = res.result;
        var drinkChoices = [];
        //filter through all the drink options and the find the 5 that match the parameters and push into the new array
        listOfDrinks.filter(function (drink) {
            // console.log(drink.primary_category);
            if (drink.primary_category === 'Wine' && drink.secondary_category === 'Red Wine') {
                // console.log(drink.secondary_category);

            } else if (drink.primary_category === 'Wine' && drink.secondary_category === 'White Wine') {
                // console.log(drink.secondary_category);

            }
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
    }).then(function (store) {
        var $store = store.result[0]; // Get the nearest store
        //    console.log($store.name, $store.id);        

        console.log(store.id);
        app.getProduct(store.id);
    });
};

app.events = function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
        //Gives us user postal code and finds the closest store
        var $postalCode = $('#postalCode').val().replace(' ', '+');
        app.getStores($postalCode);
        // console.log($postalCode);

        app.selectedPrice = $('.selectPrice input[type="radio"]:checked').val();
        app.getProduct(app.selectedPrice);
        // console.log(selectedPrice);

        var selectedDrink = $('.selectDrink input[type="radio"]:checked').attr('value');
        app.getProduct(selectedDrink);
        // console.log(selectedDrink);

        app.beerOrWineChoice(selectedDrink);
    });
}; //on click end

// based of the drink and price the user selects we have to use that informtion to iterate through the the object array we made
app.beerOrWineChoice = function (wineorbeer) {
    var beverageChoice = [];
    if (wineorbeer === 'Red Wine' || wineorbeer === 'White Wine') {
        beverageChoice.push(app.userOptions['wine']);
    } else {
        beverageChoice.push(app.userOptions['brew']);
    }
    // passing array of bevy choice into this
    app.matchingChoice(beverageChoice[0]);
    // console.log(beverageChoice[0]);
};

// beverage choice turned into choice
// we looped through the bevychoice and to find the first item in the array, drink and then we matched it with the users choice and pulled our objects info
app.matchingChoice = function (choice) {

    for (var i = 0; i < choice.length; i = i + 1) {
        var userChoice = choice[i].option;

        if (userChoice === app.selectedPrice) {
            app.finalOptions.push(choice[i]);
        }
        // console.log(choice[i]);
    }
};

app.init = function () {
    // Everything gets called inside of this function
    // app.events();
    app.getProduct(685);
};

// Document ready
$(function () {
    app.init(); // <-- we don't need to touch this
});