/*
File: derkl0.github.io/A7/a7.js
Assignment 7: Using the jQuery UI Plugin with Your Dynamic Table
Derek Lamoreaux - derek_lamoreaux@student.uml.edu
Add jQuery UI sliders for each of your text input fields.Manipulating a slider should change the value in the corresponding text input field dynamically.That is, moving the slider should 
instantly change the text input field value. Likewise, typing into the text input field should change the value indicated by the slider. Your table should update dynamically when either the slider is changed or a new text value is entered.b.The second major modification is to implement a jQuery UI tabbed interface.Each time you create a new table, display it in a new tab and label that tab with the four parameters used to create it.
File created 10/27/2020
Updated 11/21/2020
*/

//disable page refresh on button press
$("#inputForm").submit(function(e) {
    e.preventDefault();
});

// Wait for page to load
$().ready(function() {
    //initialize tabs
    $("#myTabs").tabs();
    
    // Close icon: removing the tab on click (removed funtion)
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
    
    //haha nice
    if(xMin == 69 && xMax == 69 && yMin == 69 && yMax == 69){
        window.open("https://scontent-lga3-1.cdninstagram.com/v/t51.2885-19/s320x320/117820570_223166249072422_7883241413037275009_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_ohc=YHm9oVjUEUgAX8BSXXX&tp=1&oh=8352b3fa94f63f8a68cae2541fa338a4&oe=5FE397F3");
    }

    //clear table and any error messages
    generalError.innerHTML="";
    
    //dont try to build table if input not valid
    if(!$("#inputForm").valid()){
        return;
    }
    
    //make new table
    var table = document.createElement('table');
    var row;
    var cell;

    // Add classes to table, styled by bootstrap
    table.className = "table table-striped table-dark table-bordered table-wrap";


    //Create tab and link to table
    var tableName = "x: \(" +xMin +", "+ xMax +"\) y:\("+ yMin +", "+ yMax + "\)";
    var tabNum = $("div#myTabs ul li").length;
    $("div#myTabs ul").append("<li><a href=#table"+tabNum+"> #" + (tabNum + 1) + ": " +tableName+ "</li>");

    //create checkbox for deleting tabs
    $("#checkboxes ul").append("<label> #" + (tabNum + 1) + "<input type=checkbox id=checkbox"+ tabNum + " class=boxes></label>");
    
    // Set table ID and append to table tabs
    table.setAttribute("id", "table"+tabNum);
    myTabs.appendChild(table);

    //refresh tabs
    $("div#myTabs").tabs("refresh");
    
    //set the new tab as active
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

//function to dynamically update the table when you move the slider
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
    
    //dont try if not valid input
    if(!$("#inputForm").valid()){
        return;
    }

    //grab active tab name and tag
    var active = $("div#myTabs").tabs("option", "active");
    var table = $("#table" + active)[0];
    var row;
    var cell;
    
    //Update tab text
    console.log($("#myTabs ul li"));
    $("#myTabs ul li")[active].firstChild.innerHTML = "#" + (active + 1) + "x: \(" +xMin +", "+ xMax +"\) y:\("+ yMin +", "+ yMax + "\)";

    //refresh tabs
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
    
    //clear table before redrawing
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
$(document).ready(function(){
    $(function() {
        $("#xMinSlider").slider({
            min: -50,
            max: 50,
            //on slide, update table
            slide: function( event, ui ) {
                $( "#xMin" ).val( ui.value );
                updateTable();

            },
            //on change, update table
            change: function( event, ui ) {
                updateTable();
            }
        });
    });
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
$("#xMin").change(function() {
    $("#xMinSlider").slider("value", $(this).val());
    updateTable();
});
$("#xMax").change(function() {
    $("#xMaxSlider").slider("value", $(this).val());
    updateTable();
});
$("#yMin").change(function() {
    $("#yMinSlider").slider("value", $(this).val());
    updateTable();
});
$("#yMax").change(function() {
    $("#yMaxSlider").slider("value", $(this).val());
    updateTable();
});

//function to delete all open tabs
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

//function to delete selected tabs
$("#deleteSelectedTabs").click(function(){
    //$('#myTabs').tabs('destroy').tabs();
    var tab_count = $('div#myTabs ul li').length;
    var boxes = document.getElementsByClassName('boxes');
    var j = 0;
    for (var i=0; i<tab_count; i++){        
        if(boxes[i].checked == true) {
            //shiftTables moves the tables to the right of closed tabs over so the indices don't get funky
            shiftTables(i);
            $('#table' + ((tab_count-1)-j)).remove();
            $('#myTabs ul li')[(tab_count-1)-j].remove();
            j++;
        }    
    }
    //delete the checkboxes
    for(i = 0; i<j; i++){
        boxes[i].parentElement.parentElement.removeChild(boxes[i].parentElement.parentElement.lastChild)
    }
    //uncheck any remaining boxes
    for(i = 0; i < boxes.length; i++){
        boxes[i].checked = false;
    }  
    $("div#myTabs").tabs("refresh");

});

//shiftTables moves the tables to the right of closed tabs over so the indices don't get funky
function shiftTables(index){
    var tabArray = $('div#myTabs ul li');
    var tab_count = $('div#myTabs ul li').length - 1;
    
    for(i=index; i < tab_count; i++){
        tabArray[i].firstChild.textContent = "#" + (i + 1) + " " + tabArray[i+1].firstChild.textContent.substring(4);
        $('#table' + i)[0].innerHTML = $('#table' + (i+1))[0].innerHTML;
    }
}