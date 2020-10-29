/*
File: derkl0.github.io/a5/a5.js
Assignment 5: Creating an Interactive Dynamic Table
Derek Lamoreaux - derek_lamoreaux@student.uml.edu
UML Student in 91.61 GUI Programming I
For this assignment you will create a table completely dynamically based on parameters entered in an HTML form.First, you must create a form that accepts the starting and ending numbers for both the horizontal (multiplier) and vertical (multiplicand) axes of a multiplication table.Second, you will use the numbers entered into the form to create a multiplicationtable completely dynamically.What you will create is commonly called a“single page web app” (or application)
File created 10/27/2020
Updated 10/28/2020
*/

//function to take input from user and validate it
function getValues() {
    //boolean for validation
    var check = true;
    
    //grab variables from input fields
    var xMin = document.getElementById('x-min').value;
    var xMax = document.getElementById('x-max').value;
    var yMin = document.getElementById('y-min').value;
    var yMax = document.getElementById('y-max').value;

    //set variables to use to print data
    var table = document.getElementById("table");
    var row = table.insertRow();
    var cell = row.insertCell();
    
    //clear table and any error messages
    table.innerHTML ="";
    xMinError.innerHTML = "";
    xMaxError.innerHTML = "";
    yMinError.innerHTML = "";
    yMaxError.innerHTML = "";
    generalError.innerHTML="";
    
    //check inputs
    if(!(inputCheck(xMin, xMinError))) check = false;
    if(!(inputCheck(xMax, xMaxError))) check = false;
    if(!(inputCheck(yMin, yMinError))) check = false;
    if(!(inputCheck(yMax, yMaxError))) check = false;
    
    //if all inputs passed the tests, call makeTable
    if(check){   
        makeTable(Math.round(xMin), Math.round(xMax), Math.round(yMin), Math.round(yMax), table, row, cell);
        return;
    }
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
        generalError.innerHTML="X-Min and X-Max swapped";
    }

    //if min > max swap and display a non-fatal error
    if(yMin > yMax) {
        temp = yMin;
        yMin = yMax;
        yMax = temp;
        if(generalError.innerHTML == ""){
            generalError.innerHTML="Y-Min and Y-Max swapped";
        }
        else generalError.innerHTML+="&& Y-Min and Y-Max swapped";
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

//input checking function
function inputCheck(input, error){
    error.innerHTML = "";
    if(isNaN(input)){
        error.innerHTML = "Please only enter numbers";
        return false;
    }
    if(input == ""){
        error.innerHTML = "Please fill all fields";
        return false;
    }
    if(input > 50 || input < -50){
        error.innerHTML = "Please provide integers between -50 and 50.";
        return false;
    }
    return true;
}
