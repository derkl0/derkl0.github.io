// Create variables for the welcome message
var greet = "Howdy ";
var name = "Derek";
var message = ", please check your order:";
// Concatenate the three variables above to create the welcome message
var welcome =  greet + name + message;

// Create variables to hold details about the sign
var sign = "Montague House";
var tiles = sign.length;
var subTotal = tiles * 5; //$5 for each tile
var shipping = 7;
var grandTotal = subTotal + shipping;

// Get the element that has an id of greeting
var x = document.getElementById("greeting");  // Find the element
// Replace the content of that element with the personalized welcome message
x.innerHTML = welcome;    // Change the content

// Get the element that has an id of userSign then update its contents
x = document.getElementById("userSign");  // Find the element
x.innerHTML = sign;    // Change the content

// Get the element that has an id of tiles then update its contents
x = document.getElementById("tiles");  // Find the element
x.innerHTML = tiles;    // Change the content

// Get the element that has an id of subTotal then update its contents
x = document.getElementById("subTotal");  // Find the element
x.innerHTML = "$" + subTotal;    // Change the content

// Get the element that has an id of shipping then update its contents
x = document.getElementById("shipping");  // Find the element
x.innerHTML = "$" + shipping;    // Change the content

// Get the element that has an id of grandTotal then update its contents
x = document.getElementById("grandTotal");  // Find the element
x.innerHTML = "$" + grandTotal;    // Change the content