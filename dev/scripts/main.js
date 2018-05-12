/*
Start with users quiz ask for their location(store), budget(product) and poison(product)
Grab that data and store it in variables
Get the product data and use the stored variables to get the data we need.
Get the Product id and use that to find the Store

*/
// object with two arrays, the values of the selections that users can make

// App
const app = {};

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

app.key = 'MDpjYzUzZmIyZS01MjRjLTExZTgtODEyNy1jMzA5ZjdlMWFjN2I6VVJVT3V0NTlWSXAyTU42MXp3V0xja0dSVmJ4YVhhd014bm1k';

app.getProduct = function (store, drink) {
    // filter through the whole product array
    return $.ajax({
        url: `http://lcboapi.com/products?primary_category=${drink}&per_page=100&=${store}`,
        dataType: 'jsonp',
        method: 'GET',
        headers: { Authorization: app.key }
    }).then(function (drink) {
        
        //   console.log(drink);
        let listOfDrinks = drink.result;
        let drinkChoices = [];
        //filter through all the drink options and the find the 5 that match the parameters and push into the new array
        listOfDrinks.filter(function (drink) {
            if (drink.primary_category === 'Wine' && drink.secondary_category === selectedDrink) {

            } else if (drink.primary_category === 'Wine' && drink.secondary_category === selectedDrink) {
                console.log(drink.secondary_category);

            }
        });
    });
}; // productid end

// this finds the closest store based on postal code, get the  store on submit of the app.events
app.getStores = function (geo) {
    return $.ajax({
        url: `http://lcboapi.com/stores?&geo=${geo}`,
        headers: {
            Authorization: app.key
        },
        contentType: 'application/json',
        dataType: 'jsonp'
    }).then(function (store) {
        const $store = store.result[0]; // Get the nearest store
        app.storeID = $store.id;  
        //    console.log($store.name, $store.id);     
    });
};

app.events = function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
        //Gives us user postal code and finds the closest store
        const $postalCode = $('#postalCode').val().replace(' ', '+');
        app.getStores($postalCode);
        // console.log($postalCode);

        app.selectedPrice = $('.selectPrice input[type="radio"]:checked').val();
        app.getProduct(app.selectedPrice);
        // console.log(selectedPrice);

        const selectedDrink = $('.selectDrink input[type="radio"]:checked').attr('value');
        app.getProduct(selectedDrink);
        // console.log(selectedDrink);

        app.beerOrWineChoice(selectedDrink);
        app.getProduct(app.storeID);

    });
}; //on click end



// based of the drink and price the user selects we have to use that informtion to iterate through the the object array we made
app.beerOrWineChoice = function (wineorbeer) {
    const beverageChoice = [];
    
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
    // this is to refresh the array so user can change their option
    app.finalOptions = [];

    for (let i = 0; i < choice.length; i = i + 1) {
        const userChoice = choice[i].option;

        if (userChoice === app.selectedPrice) {
            app.finalOptions.push(choice[i]);
        }
        // console.log(choice[i]);
    }

    // This number stores the price variable from the arrays
    const lowPoint = app.finalOptions[0].lowpoint;
    const highPoint = app.finalOptions[0].highpoint;
    // Now calling the APfile:///Users/mikaelascornaienchi/Documents/Sites/2018WinterBootcamp/week5/day5-gulp/movieCodeAlong/index.html?I this runs when we start the event to give us the information from the low and high point
    app.getProduct()
};

app.init = function () {
    // Everything gets called inside of this function
    app.events();
};

// Document ready
$(function () {
    app.init(); // <-- we don't need to touch this
});