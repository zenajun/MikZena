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
<<<<<<< HEAD
app.selectedDrinks = [];
=======
<<<<<<< HEAD
app.selectedDrinks = [];
=======


>>>>>>> 9ca02a19fa33744d5e78d40f6f7e31788ad1ceb8
>>>>>>> 71910743a5cef0c32c3c64574abb2e6f05f1f1d4
app.key = 'MDpjYzUzZmIyZS01MjRjLTExZTgtODEyNy1jMzA5ZjdlMWFjN2I6VVJVT3V0NTlWSXAyTU42MXp3V0xja0dSVmJ4YVhhd014bm1k';

app.getWine = function (store, wineColor) {
    return $.ajax({
<<<<<<< HEAD
        url: 'http://lcboapi.com/products?q=' + app.finalOptions.drink + '&per_page=100&=' + store,
=======

<<<<<<< HEAD
        url: 'http://lcboapi.com/products?q=' + app.finalOptions.drink + '&per_page=100&=' + store,
=======
        url: 'http://lcboapi.com/products?q=' + wineColour + '&per_page=100&=' + store,
>>>>>>> 9ca02a19fa33744d5e78d40f6f7e31788ad1ceb8
>>>>>>> 71910743a5cef0c32c3c64574abb2e6f05f1f1d4
        dataType: 'jsonp',
        method: 'GET',
        headers: {
            Authorization: app.key
        }
    }).then(function (res) {
        var wines = res.result;
        var drinkArray = [];
<<<<<<< HEAD
        app.selectedDrink = [];
        wines.filter(function (wine) {
            if (wine.secondary_category = wineColor && wine.price_in_cents > app.finalOptions.lowPoint && wine.price_in_cents < app.finalOptions.highPoint) {
                // console.log(wine);  
                drinkArray.push(wine);
            }
        });
        for (var i = 0; i < 3; i++) {
            app.randomDrank(drinkArray);
        }
        app.displayInfo();
    });
};
=======
        app.selectedDrinks = [];
        wines.filter(function (wine) {
<<<<<<< HEAD
            if (wine.secondary_category = wineColor && wine.price_in_cents > app.finalOptions.lowPoint && wine.price_in_cents < app.finalOptions.highPoint) {
                drinkArray.push(wine);
            }
=======
            if (wine.secondary_category = 'White Wine' && wine.price_in_cents < 1000) {}
>>>>>>> 71910743a5cef0c32c3c64574abb2e6f05f1f1d4

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
        // first array to get all the drink options to sort them
        var drinkArray = [];
        // this filters through and only gives us 3 random drink options
        app.selectedDrink = [];
        beersCiders.filter(function (beerCider) {
            if (beerCider.price_in_cents > app.finalOptions.lowPoint && beerCider.price_in_cents < app.finalOptions.highPoint) {
                drinkArray.push(beerCider);
            }
<<<<<<< HEAD
        });
        // to loop through and only give us three
=======

>>>>>>> 9ca02a19fa33744d5e78d40f6f7e31788ad1ceb8
        });
>>>>>>> 71910743a5cef0c32c3c64574abb2e6f05f1f1d4
        for (var i = 0; i < 3; i++) {
            app.randomDrank(drinkArray);
        }
        app.displayInfo();
    });
};
//app to display on page drink info
app.displayInfo = function () {
    $('section.results').empty();
    for (var i = 0; i < 3; i++) {
        var resultsContainer = '\n        <div class="userResult">\n        <h2 class="userDrink">' + app.selectedDrinks[i].name + '</h2>\n        <p class="userPrice">' + (app.selectedPrice[i].price_in_cents / 100).toFixed(2) + '</p>\n        <img src="' + app.selectedDrink[i].image_url + '">\n        </div>';
        $('section.result').append(resultsContainer);
    }
};

<<<<<<< HEAD
// get a random drink from the options of drinks and push to the array
app.randomDrank = function (array) {
    var oneDrank = Math.floor(Math.random() * array.length);
    array.splice(array[oneDrank], 1);
    console.log(array[oneDrank]);

=======
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
                // console.log(beerCider.name, beerCider.img_url, beerCider.price_in_cents);               
                // app.displayInfo(beerCider.name)
            }
        });
        for (var i = 0; i < 3; i++) {
            app.randomDrank(drinkArray);
        }
        app.displayInfo();
    });
};

app.displayInfo = function () {
    $('section.result').empty();
    for (var i = 0; i < 3; i++) {
        var resultsContainer = '<div class="userResult">\n                <h2 class="userDrink">' + app.selectedDrinks[i].name + '</h2>\n                <p class="userPrice">$' + (app.selectedDrinks[i].price_in_cents / 100).toFixed(2) + '</p>\n                <img src ="' + app.selectedDrinks[i].image_url + '">\n            </div>';
        $('section.result').append(resultsContainer);
        //     console.log(app.selectedDrinks[i].name, app.selectedDrinks[i].price_in_cents);
        //     //  app.selectedDrinks[i].name
    }
};

app.randomDrank = function (array) {
    var oneDrank = Math.floor(Math.random() * array.length);
    array.splice(array[oneDrank], 1);
>>>>>>> 71910743a5cef0c32c3c64574abb2e6f05f1f1d4
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
        app.storeID = $store.id;
        // app.storeAddress = $storeA
        console.log($store);
    });
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
<<<<<<< HEAD

=======
>>>>>>> 71910743a5cef0c32c3c64574abb2e6f05f1f1d4
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
    console.log(app.finalOptions);
};

// app display on page the store location

app.init = function () {
    // Everything gets called inside of this function    
    app.events();
};

// Document ready
$(function () {
    app.init(); // <-- we don't need to touch this
});