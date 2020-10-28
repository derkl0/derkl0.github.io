function getValues() {
    var check = true;
    
    var xMin = document.getElementById('x-min').value;
    var xMax = document.getElementById('x-max').value;
    var yMin = document.getElementById('y-min').value;
    var yMax = document.getElementById('y-max').value;

    var table = document.getElementById("table");
    var row = table.insertRow();
    var cell = row.insertCell();
    
    table.innerHTML ="";
    xMinError.innerHTML = "";
    xMaxError.innerHTML = "";
    yMinError.innerHTML = "";
    yMaxError.innerHTML = "";
    generalError.innerHTML="";
    
    if(!(inputCheck(xMin, xMinError))) check = false;
    if(!(inputCheck(xMax, xMaxError))) check = false;
    if(!(inputCheck(yMin, yMinError))) check = false;
    if(!(inputCheck(yMax, yMaxError))) check = false;
    
    if(check){   
        makeTable(Math.round(xMin), Math.round(xMax), Math.round(yMin), Math.round(yMax), table, row, cell);
        return;
    }

}

function makeTable(xMin,xMax,yMin,yMax,table,row,cell){

    table.innerHTML ="";

    // If the xStart input is > xEnd input, swap
    if(xMin > xMax) {
        temp = xMin;
        xMin = xMax;
        xMax = temp;
        generalError.innerHTML="X-Min and X-Max swapped";
    }

    // If the yStart input is > yEnd input, swap
    if(yMin > yMax) {
        temp = yMin;
        yMin = yMax;
        yMax = temp;
        if(generalError.innerHTML == ""){
            generalError.innerHTML="Y-Min and Y-Max swapped";
        }
        else generalError.innerHTML+="&& Y-Min and Y-Max swapped";
    }



    row = table.insertRow();
    cell = row.insertCell();
    cell.innerHTML = "x";

    // Create X-Axis Header
    for (var i = xMin; i <= xMax; i++) {
        cell = row.insertCell();
        cell.innerHTML = i;
    }

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
