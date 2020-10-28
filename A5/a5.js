function getValues() {
    console.log("what the fuck is up");
    var xMin = document.getElementById('x-min').value;
    var xMax = document.getElementById('x-max').value;
    var yMin = document.getElementById('y-min').value;
    var yMax = document.getElementById('y-max').value;

    var table = document.getElementById("table");
    var row = table.insertRow();
    var cell = row.insertCell();

    makeTable(Math.round(xMin), Math.round(xMax), Math.round(yMin), Math.round(yMax), table, row, cell);
    return;

}

function makeTable(xMin,xMax,yMin,yMax,table,row,cell){

    table.innerHTML ="";

    // If the xStart input is > xEnd input, swap
    if(xMin > xMax) {
        temp = xMin;
        xMin = xMax;
        xMax = temp;
    }

    // If the yStart input is > yEnd input, swap
    if(yMin > yMax) {
        temp = yMin;
        yMin = yMax;
        yMax = temp;
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
