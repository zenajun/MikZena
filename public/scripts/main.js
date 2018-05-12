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
            highpoint: 1999
        },
        pricy: {
            lowpoint: 2000,
            highpoint: 3499
        },
        expensive: {
            lowpoint: 3500,
            highpoint: 100000
        }
    }
};


app.finalOptions = {};


app.key = 'MDpjYzUzZmIyZS01MjRjLTExZTgtODEyNy1jMzA5ZjdlMWFjN2I6VVJVT3V0NTlWSXAyTU42MXp3V0xja0dSVmJ4YVhhd014bm1k';

app.getWine = function (store, wineColour) {
    return $.ajax({

        url: 'http://lcboapi.com/products?q=' + wineColour + '&per_page=100&=' + store,
        dataType: 'jsonp',
        method: 'GET',
        headers: {
            Authorization: app.key
        }
    }).then(function (res) {
        var wines = res.result;
        wines.filter(function (wine) {
            if (wine.secondary_category = 'White Wine' && wine.price_in_cents < 1000) {}

        url: 'http://lcboapi.com/products?primary_category=' + drink + '&per_page=100&=' + store,
        dataType: 'jsonp',
        method: 'GET',
        headers: { Authorization: app.key }
    }).then(function (drink) {

        //   console.log(drink);
        var listOfDrinks = drink.result;
        var drinkChoices = [];
        //filter through all the drink options and the find the 5 that match the parameters and push into the new array
        listOfDrinks.filter(function (drink) {
            if (drink.primary_category === 'Wine' && drink.secondary_category === selectedDrink) {} else if (drink.primary_category === 'Wine' && drink.secondary_category === selectedDrink) {
                console.log(drink.secondary_category);
            }

        });
    });
};

app.getBeerCider = function (store, beerCider) {}
// put API call here


// this finds the closest store based on postal code, get the  store on submit of the app.events
;app.getStores = function (geo) {
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

        //    console.log($store.name, $store.id);     

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
    });
}; //on click end

app.getBeverageAndPriceRange = function (drink, price) {
    if (drink === 'Red Wine') {
        app.finalOptions.drink = 'red+wine';
    } else if (drink === 'White Wine') {
        app.finalOptions.drink = 'white+wine';
    } else if (drink === 'Beer') {
        app.finalOptions.drink = 'beer';

        app.getProduct(selectedDrink);
        // console.log(selectedDrink);

        app.beerOrWineChoice(selectedDrink);
        app.getProduct(app.storeID);
    });
}; //on click end


// based of the drink and price the user selects we have to use that informtion to iterate through the the object array we made
app.beerOrWineChoice = function (wineorbeer) {
    var beverageChoice = [];

    if (wineorbeer === 'Red Wine' || wineorbeer === 'White Wine') {
        beverageChoice.push(app.userOptions['wine']);

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

    // passing array of bevy choice into this
    app.matchingChoice(beverageChoice[0]);
    // console.log(beverageChoice[0]);
};

// beverage choice turned into choice
// we looped through the bevychoice and to find the first item in the array, drink and then we matched it with the users choice and pulled our objects info
app.matchingChoice = function (choice) {
    // this is to refresh the array so user can change their option
    app.finalOptions = [];

    for (var i = 0; i < choice.length; i = i + 1) {
        var userChoice = choice[i].option;

        if (userChoice === app.selectedPrice) {
            app.finalOptions.push(choice[i]);

        }
    }
    console.log(app.finalOptions);


    // This number stores the price variable from the arrays
    var lowPoint = app.finalOptions[0].lowpoint;
    var highPoint = app.finalOptions[0].highpoint;
    // Now calling the APfile:///Users/mikaelascornaienchi/Documents/Sites/2018WinterBootcamp/week5/day5-gulp/movieCodeAlong/index.html?I this runs when we start the event to give us the information from the low and high point
    app.getProduct();

};

app.init = function () {
    // Everything gets called inside of this function    
    app.events();
};

// Document ready
$(function () {
    app.init(); // <-- we don't need to touch this
});