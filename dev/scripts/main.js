/*
Start with users quiz ask for their location(store), budget(product) and poison(product)
Grab that data and store it in variables
Get the product data and use the stored variables to get the data we need.
Get the Product id and use that to find the Store


*/


// App
const app = {};
app.postal = 'm5s+2j6';

app.key = 'MDpjYzUzZmIyZS01MjRjLTExZTgtODEyNy1jMzA5ZjdlMWFjN2I6VVJVT3V0NTlWSXAyTU42MXp3V0xja0dSVmJ4YVhhd014bm1k';

app.getProduct = function (store, drink) { // Mikaela
  return $.ajax({
      url: `http://lcboapi.com/products?primary_category=Wine&per_page=100&store_id=511`,
    dataType: 'jsonp',
    method: 'GET',
    headers: 
      { Authorization: app.key}
    })
  .then( (drink) => {
      console.log(drink.result);
      const listOfDrinks = drink.result;
      listOfDrinks.filter((drink) => {
        console.log(drink);
        if (drink .price_in_cents > 5000) {
            // console.log(drink);  
        } 
      });
    });
} // productid end


app.getPrice = function (regular_price_in_cents) { // Mikaela
    return $.ajax({
        url: `http://lcboapi.com/products?per_page=100${regular_price_in_cents}`,
        dataType: 'jsonp',
        method: 'GET',
        headers: { 
            Authorization: app.key 
        }
    })
    .then((budget) => {
        console.log(budget);
    });

} // getprice end

app.getStore = function(id) {
    return $.ajax({
        url: `http://lcboapi.com/products?store_id=${id}`,
        headers: {
            Authorization: app.key
        },
        contentType: 'application/json',
        dataType: 'jsonp'
    }).then(function (res) {
        console.log(res.result);      

    });
}

app.getStores = function(geo)  { // Zena  
   return $.ajax({
       url: `http://lcboapi.com/stores?&geo=${geo}`,
       headers: {
           Authorization: app.key
       },
       contentType: 'application/json',
       dataType: 'jsonp'
   }).then(function (store) {
       // grab the nearest LCBO stores       
       let $store = store.result[0];
       console.log($store.name, $store.id);        
       
   });
} //postal code end

app.events = function() {
    $('form').on('submit', function(e) {
        e.preventDefault();        
        const $postalCode = $('#postalCode').val();
        app.getStores($postalCode);
        
        const selectedPrice = $('.selectPrice input[name="radio"]:checked').val();
        app.getPrice(selectedPrice);
        console.log(selectedPrice);

        const selectedDrink = $('.selectDrink input[type="radio"]:checked').attr('value');
        app.getProduct(selectedDrink);
        console.log(selectedDrink);
    });
} //on click end


app.init = function() {  // Everything gets called inside of this function
    app.events();
    app.getProduct();
    app.getPrice();
    // app.getStore();    
}

// Document ready
$(function() {
    app.init(); // <-- we don't need to touch this
});
