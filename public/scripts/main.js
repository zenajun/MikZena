'use strict';

/*
Start with users quiz ask for their location(store), budget(product) and poison(product)
Grab that data and store it in variables
Get the product data and use the stored variables to get the data we need.
Get the Product id and use that to find the Store

*/
// object with two arrays, the values of the selections that users can make

var app = {};

app.userOptions = {
    wine: {
        budget: {
            lowpoint: 0,
            highpoint: 999
        },
        cheap: {
            lowpoint: 1000,
            highpoint: 1999
        },
        pricy: {
            lowpoint: 2000,
            highpoint: 3999
        },
        expensive: {
            lowpoint: 4000,
            highpoint: 200000
        }
    },
    brew: {
        budget: {
            lowpoint: 0,
            highpoint: 399
        },
        cheap: {
            lowpoint: 400,
            highpoint: 1499
        },
        pricy: {
            lowpoint: 1500,
            highpoint: 1999
        },
        expensive: {
            lowpoint: 2000,
            highpoint: 100000
        }
    }
};

app.finalOptions = {};
app.selectedDrinks = [];
app.key = 'MDpjYzUzZmIyZS01MjRjLTExZTgtODEyNy1jMzA5ZjdlMWFjN2I6VVJVT3V0NTlWSXAyTU42MXp3V0xja0dSVmJ4YVhhd014bm1k';

app.getWine = function (store, wineColor) {
    return $.ajax({
        url: 'http://lcboapi.com/products?q=' + app.finalOptions.drink + '&per_page=100&=' + store,
        dataType: 'jsonp',
        method: 'GET',
        headers: {
            Authorization: app.key
        }
    }).then(function (res) {
        var wines = res.result;
        var drinkArray = [];
        app.selectedDrinks = [];
        wines.filter(function (wine) {
            if (wine.secondary_category = wineColor && wine.price_in_cents > app.finalOptions.lowPoint && wine.price_in_cents < app.finalOptions.highPoint) {
                drinkArray.push(wine);
            }
        });
        for (var i = 0; i < 3; i++) {
            app.randomDrank(drinkArray);
        }
        app.displayInfo();
    });
};

app.getBeerCider = function (store) {
    return $.ajax({
        url: 'http://lcboapi.com/products?q=' + app.finalOptions.drink + '&per_page=100&=' + store,
        dataType: 'jsonp',
        method: 'GET',
        headers: {
            Authorization: app.key
        }
    }).then(function (res) {
        var beersCiders = res.result;
        var drinkArray = [];
        app.selectedDrinks = [];
        beersCiders.filter(function (beerCider) {
            if (beerCider.price_in_cents > app.finalOptions.lowPoint && beerCider.price_in_cents < app.finalOptions.highPoint) {
                drinkArray.push(beerCider);
            }
        });
        for (var i = 0; i < 3; i++) {
            app.randomDrank(drinkArray);
        }
        app.displayInfo();
    });
};

app.displayInfo = function (store) {
    $('.result .results-container').empty();

    for (var i = 0; i < 3; i++) {
        var resultsContainer = '<div class="userResult">\n                <h4 class="userDrink">' + app.selectedDrinks[i].name + ' <span>$' + (app.selectedDrinks[i].price_in_cents / 100).toFixed(2) + '<span></h4>\n                <h4 class="userDrink">' + app.selectedDrinks[i].name + ' <span>$' + (app.selectedDrinks[i].price_in_cents / 100).toFixed(2) + '</span></h4>\n                <img src ="' + app.selectedDrinks[i].image_url + '" alt="' + app.selectedDrinks[i].tags + '">\n                <p class="drinkNotes"></p>\n            </div>';
        $('.result .results-container').append(resultsContainer);
    }
};

app.randomDrank = function (array) {
    var oneDrank = Math.floor(Math.random() * array.length);
    array.splice(array[oneDrank], 1);
    app.selectedDrinks.push(array[oneDrank]);
};

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
        app.storeLocation = $store;
        app.storeID = $store.id;
        app.displayLocation();
    });
};

app.displayLocation = function () {
    $('section .locationResult').empty();
    var locationResultContainer = '<div class="userResult">\n        \t<h2>Your store and results:</h2>\n            <h5 class="userDrink">' + app.storeLocation.address_line_1 + ', ' + app.storeLocation.city + '</h5>\n            <h5 class="userDrink">' + app.storeLocation.city + '</h5>\n        </div>';
    $('section .locationResult').append(locationResultContainer);

    $('html, body').animate({
        scrollTop: $("#locationResult").offset().top
    }, 500);
};

app.events = function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
        //Gives us user postal code and finds the closest store
        var $postalCode = $('#postalCode').val().replace(' ', '+');
        app.getStores($postalCode);

        var usersPriceRange = $('.selectPrice input[type="radio"]:checked').val();

        var selectedDrink = $('.selectDrink input[type="radio"]:checked').attr('value');
        app.getBeverageAndPriceRange(selectedDrink, usersPriceRange);
        if (selectedDrink === 'White Wine' || selectedDrink === 'Red Wine') {
            app.getWine(app.storeID, selectedDrink);
        } else {
            app.getBeerCider(app.storeID);
        }
    });
}; //on click end

app.getBeverageAndPriceRange = function (drink, price) {
    if (drink === 'Red Wine') {
        app.finalOptions.drink = 'red+wine';
    } else if (drink === 'White Wine') {
        app.finalOptions.drink = 'white+wine';
    } else if (drink === 'Beer') {
        app.finalOptions.drink = 'beer';
    } else {
        app.finalOptions.drink = 'cider';
    }
    if (drink === 'Red Wine' || drink === 'White Wine') {
        if (price === 'budget') {
            app.finalOptions.lowPoint = app.userOptions.wine.budget.lowpoint;
            app.finalOptions.highPoint = app.userOptions.wine.budget.highpoint;
        } else if (price === 'cheap') {
            app.finalOptions.lowPoint = app.userOptions.wine.cheap.lowpoint;
            app.finalOptions.highPoint = app.userOptions.wine.cheap.highpoint;
        } else if (price === 'pricy') {
            app.finalOptions.lowPoint = app.userOptions.wine.pricy.lowpoint;
            app.finalOptions.highPoint = app.userOptions.wine.pricy.highpoint;
        } else {
            app.finalOptions.lowPoint = app.userOptions.wine.expensive.lowpoint;
            app.finalOptions.highPoint = app.userOptions.wine.expensive.highpoint;
        }
    } else {
        if (price === 'budget') {
            app.finalOptions.lowPoint = app.userOptions.brew.budget.lowpoint;
            app.finalOptions.highPoint = app.userOptions.brew.budget.highpoint;
        } else if (price === 'cheap') {
            app.finalOptions.lowPoint = app.userOptions.brew.cheap.lowpoint;
            app.finalOptions.highPoint = app.userOptions.brew.cheap.highpoint;
        } else if (price === 'pricy') {
            app.finalOptions.lowPoint = app.userOptions.brew.pricy.lowpoint;
            app.finalOptions.highPoint = app.userOptions.brew.pricy.highpoint;
        } else {
            app.finalOptions.lowPoint = app.userOptions.brew.expensive.lowpoint;
            app.finalOptions.highPoint = app.userOptions.brew.expensive.highpoint;
        }
    }
};

app.init = function () {
    // Everything gets called inside of this function    
    app.events();
};

// Document ready
$(function () {
    app.init(); // <-- we don't need to touch this
});