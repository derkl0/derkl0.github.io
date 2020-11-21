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
    //initialize tabs
    $("#myTabs").tabs();
    
    // Close icon: removing the tab on click
    /*$("#myTabs").on( "click", "span.ui-icon-close", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        console.log(panelId);
        $( "#" + panelId ).remove();
        $("div#myTabs").tabs( "refresh" );
    });*/

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
function makeTable() {
    //boolean for validation
    var check = true;

    //grab variables from input fields
    var xMin = Math.round(document.getElementById('xMin').value);
    var xMax = Math.round(document.getElementById('xMax').value);
    var yMin = Math.round(document.getElementById('yMin').value);
    var yMax = Math.round(document.getElementById('yMax').value);

    //clear table and any error messages
    generalError.innerHTML="";

    if(!$("#inputForm").valid()){
        return;
    }

    var table = document.createElement('table');
    var row;
    var cell;

    // Add classes to table, styled by bootsrap
    table.className = "table table-striped table-dark table-bordered table-wrap";


    //Create tab and link to table
    var tableName = "x: \(" +xMin +", "+ xMax +"\) y:\("+ yMin +", "+ yMax + "\)";
    var tabNum = $("div#myTabs ul li").length;
    $("div#myTabs ul").append("<li><a href=#table"+tabNum+"> #" + (tabNum + 1) + ": " +tableName+ "</li>");
    
    //$("div#myTabs ul").append("<li><a href=#table"+tabNum+"> #" + tabNum + ": " +tableName+ "<label " + tableName + "></label><span class='ui-icon ui-icon-close' role='presentation'> </span></li>");
    
    $("#checkboxes ul").append("<label> #" + (tabNum + 1) + "<input type=checkbox id=checkbox"+ tabNum + " class=boxes></label>");
    
    // Set table ID and append to table tabs
    table.setAttribute("id", "table"+tabNum);
    myTabs.appendChild(table);

    $("div#myTabs").tabs("refresh");

    $("div#myTabs").tabs({ active: tabNum});


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

function updateTable() {

    //boolean for validation
    if($("#myTabs ul li").length == 0) return;

    //grab variables from input fields
    var xMin = Math.round(document.getElementById('xMin').value);
    var xMax = Math.round(document.getElementById('xMax').value);
    var yMin = Math.round(document.getElementById('yMin').value);
    var yMax = Math.round(document.getElementById('yMax').value);

    //clear table and any error messages
    generalError.innerHTML="";

    if(!$("#inputForm").valid()){
        return;
    }

    var active = $("div#myTabs").tabs("option", "active");
    var table = $("#table" + active)[0];
    var row;
    var cell;
    
    console.log(active);
    //Update tab text
    console.log($("#myTabs ul li"));
    $("#myTabs ul li")[active].firstChild.innerHTML = "#" + (active + 1) + "x: \(" +xMin +", "+ xMax +"\) y:\("+ yMin +", "+ yMax + "\)"; //"<span class='ui-icon ui-icon-close' role='presentation'> </span>";

    $("div#myTabs").tabs("refresh");

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

    table.innerHTML ="";

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

// jQuery Slider functions
// xStart
$(document).ready(function(){
    $(function() {
        $("#xMinSlider").slider({
            min: -50,
            max: 50,
            slide: function( event, ui ) {
                $( "#xMin" ).val( ui.value );
                updateTable();

            },
            change: function( event, ui ) {
                updateTable();
            }
        });
    });
    // xEnd
    $(function() {
        $("#xMaxSlider" ).slider({
            min: -50,
            max: 50,
            slide: function( event, ui ) {
                $( "#xMax" ).val( ui.value );
                updateTable();
            },
            change: function( event, ui ) {
                updateTable();
            }
        });
    });
    // yStart
    $(function() {
        $( "#yMinSlider" ).slider({
            min: -50,
            max: 50,
            slide: function( event, ui ) {
                $( "#yMin" ).val( ui.value );
                updateTable();
            },
            change: function( event, ui ) {
                updateTable();
            }
        });
    });
    // yEnd
    $(function() {
        $( "#yMaxSlider" ).slider({
            min: -50,
            max: 50,
            slide: function( event, ui ) {
                $( "#yMax" ).val( ui.value );
                updateTable();
            },
            change: function( event, ui ) {
                updateTable();
            }
        });
    });
});

// jQuery when text input is changed slider updates.
// xStartingNum
$("#xMin").change(function() {
    $("#xMinSlider").slider("value", $(this).val());
    updateTable();
});
// xEndingNum
$("#xMax").change(function() {
    $("#xMaxSlider").slider("value", $(this).val());
    updateTable();
});
// yStartingNum
$("#yMin").change(function() {
    $("#yMinSlider").slider("value", $(this).val());
    updateTable();
});
// yEndingNum
$("#yMax").change(function() {
    $("#yMaxSlider").slider("value", $(this).val());
    updateTable();
});

$("#deleteAllTabs").click(function(){
    var tab_count = $('div#myTabs ul li').length;
    for (i=0; i<tab_count; i++){
        $('#myTabs ul li').remove(0);
        $("table").remove(0);
    }
    $("#myTabs").tabs();
    
    var boxes = document.getElementsByClassName('boxes')[0];
    boxes.parentElement.parentElement.innerHTML = "";
    
});

$("#deleteSelectedTabs").click(function(){
    //$('#myTabs').tabs('destroy').tabs();
    var tab_count = $('div#myTabs ul li').length;
    var boxes = document.getElementsByClassName('boxes');
    var j = 0;
    for (var i=0; i<tab_count; i++){        
        if(boxes[i].checked == true) {
            shiftTables(i);
            $('#table' + ((tab_count-1)-j)).remove();
            $('#myTabs ul li')[(tab_count-1)-j].remove();
            j++;
        }    
    }
    for(i = 0; i<j; i++){
        boxes[i].parentElement.parentElement.removeChild(boxes[i].parentElement.parentElement.lastChild)
    }
    for(i = 0; i < boxes.length; i++){
        boxes[i].checked = false;
    }  
    $("div#myTabs").tabs("refresh");

});

function shiftTables(index){
    var tabArray = $('div#myTabs ul li');
    var tab_count = $('div#myTabs ul li').length - 1;
    
    for(i=index; i < tab_count; i++){
        tabArray[i].firstChild.textContent = "#" + (i + 1) + " " + tabArray[i+1].firstChild.textContent.substring(4);
        $('#table' + i)[0].innerHTML = $('#table' + (i+1))[0].innerHTML;
    }
}