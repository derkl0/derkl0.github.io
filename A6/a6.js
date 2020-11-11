/*
File: derkl0.github.io/a6/a6.js
Assignment 6: Using the jQuery Validation Plugin with Your Dynamic Table
Derek Lamoreaux - derek_lamoreaux@student.uml.edu
UML Student in 91.61 GUI Programming I
Modify your page to validate all data entered by the user using the jQuery Validation plugin (http://plugins.jquery.com)or foundhere (https://jqueryvalidation.org/)andprevent the form from being submitted (or the table from being regenerated) if the user’s entry contains an error.If there is no error, regenerate the table as in the previous assignment.
File created 10/27/2020
Updated 10/28/2020
*/

//disable page refresh on button press
$("#inputForm").submit(function(e) {
    e.preventDefault();
});
// Wait for page to load
$().ready(function() {
    // Initialize form validation on the registration form.
    $("#inputForm").validate({
        // Specify rules for inputs
        rules: {
            xMin: {
                required: true,
                number: true 
            },
            xMax: {
                required: true,
                number: true
            },
            yMin: {
                required: true,
                number: true 
            },
            yMax: {
                required: true,
                number: true
            }
        },
        // Specify validation error messages
        messages: {
            xMin: {
                required: "Please enter an integer between -50 and 50",
                number: "Please enter an integer"
            },
            xMax: {
                required: "Please enter an integer between -50 and 50",
                number: "Please enter an integer"
            },
            yMin: {
                required: "Please enter an integer between -50 and 50",
                number: "Please enter an integer"
            },
            yMax: {
                required: "Please enter an integer between -50 and 50",
                number: "Please enter an integer"
            }
        },
    });
    //change default min and max error messages
    $.extend($.validator.messages, {
        min: 'Please enter an integer between -50 and 50',
        max: 'Please enter an integer between -50 and 50'
    });
});


//function to take input from user and validate it
function getValues() {
    //boolean for validation
    var check = true;

    //grab variables from input fields
    var xMin = document.getElementById('xMin').value;
    var xMax = document.getElementById('xMax').value;
    var yMin = document.getElementById('yMin').value;
    var yMax = document.getElementById('yMax').value;

    //set variables to use to print data
    var table = document.getElementById("table");
    var row = table.insertRow();
    var cell = row.insertCell();

    //clear table and any error messages
    table.innerHTML ="";
    generalError.innerHTML="";

    if(!$("#inputForm").valid()){
        return;
    }
    makeTable(Math.round(xMin), Math.round(xMax), Math.round(yMin), Math.round(yMax), table, row, cell);
    return;
}

//takes input from getValues and generates the table
function makeTable(xMin,xMax,yMin,yMax,table,row,cell){

    //clear any previous table
    table.innerHTML ="";

    //if min > max swap and display a non-fatal error
    if(xMin > xMax) {
        temp = xMin;
        xMin = xMax;
        xMax = temp;
        if(generalError.innerHTML == ""){
            generalError.innerHTML="X-Min and X-Max swapped";
        }
        else generalError.innerHTML+=" & X-Min and X-Max swapped";
    }

    //if min > max swap and display a non-fatal error
    if(yMin > yMax) {
        temp = yMin;
        yMin = yMax;
        yMax = temp;
        if(generalError.innerHTML == ""){
            generalError.innerHTML="Y-Min and Y-Max swapped";
        }
        else generalError.innerHTML+=" & Y-Min and Y-Max swapped";
    }

    //create row and cell with x
    row = table.insertRow();
    cell = row.insertCell();
    cell.innerHTML = "x";

    //iterate through and fill first row
    for (var i = xMin; i <= xMax; i++) {
        cell = row.insertCell();
        cell.innerHTML = i;
    }

    //iterate through and fill first the remaining columns
    for (var i = yMin; i <= yMax; i++) {
        row = table.insertRow();
        // First cell for y header
        cell = row.insertCell();
        cell.innerHTML = i;
        for (var j = xMin; j <= xMax; j++) { 
            cell = row.insertCell();
            cell.innerHTML = j*i;
        }
    }
}