function myFunction(){
// ADD NEW ITEM TO END OF LIST
    var ul = document.getElementById("one").parentNode;
    var liEnd = document.createElement("li");
    liEnd.appendChild(document.createTextNode("cream"));
    ul.append(liEnd);

// ADD NEW ITEM START OF LIST
    var liStart = document.createElement("li");
    liStart.appendChild(document.createTextNode("kale"));
    ul.insertBefore(liStart, document.getElementById("one"));

// ADD A CLASS OF COOL TO ALL LIST ITEMS
    document.getElementById("one").classList.add("cool");
    document.getElementById("two").classList.add("cool");
    document.getElementById("three").classList.add("cool");
    document.getElementById("four").classList.add("cool");
    liStart.setAttribute("class", "cool");
    liEnd.setAttribute("class", "cool");

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
    var num = document.getElementsByTagName("li");
    var head = document.getElementsByTagName("h2");
    var head2 = head.item(0);
    head2.innerHTML += "<span>"+num.length+"</span>";
}

window.onload = myFunction();