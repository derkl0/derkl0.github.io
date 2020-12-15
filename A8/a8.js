/*
File: derkl0.github.io/A8/a8.js
derek_lamoreaux@student.uml.edu

Assignment 8: Create interactive Scrabble game in javascript

File created 12/6/2020
Updated 12/10/2020
*/

/*jslint browser: true*/
/*global $, jQuery*/

//adapted from structure built by Ramon Meza provided by Professor Zhou
var tiles = [
    {"letter": "A", "points": 1, "amount": 9, "remain": 9, "file": "image/tiles/Scrabble_Tile_A.jpg"},
    {"letter": "B", "points": 3, "amount": 2, "remain": 2, "file": "image/tiles/Scrabble_Tile_B.jpg"},
    {"letter": "C", "points": 3, "amount": 2, "remain": 2, "file": "image/tiles/Scrabble_Tile_C.jpg"},
    {"letter": "D", "points": 2, "amount": 4, "remain": 4, "file": "image/tiles/Scrabble_Tile_D.jpg"},
    {"letter": "E", "points": 1, "amount": 12, "remain": 12, "file": "image/tiles/Scrabble_Tile_E.jpg"},
    {"letter": "F", "points": 4, "amount": 2, "remain": 2, "file": "image/tiles/Scrabble_Tile_F.jpg"},
    {"letter": "G", "points": 2, "amount": 3, "remain": 3, "file": "image/tiles/Scrabble_Tile_G.jpg"},
    {"letter": "H", "points": 4, "amount": 2, "remain": 2, "file": "image/tiles/Scrabble_Tile_H.jpg"},
    {"letter": "I", "points": 1, "amount": 9, "remain": 9, "file": "image/tiles/Scrabble_Tile_I.jpg"},
    {"letter": "J", "points": 8, "amount": 1, "remain": 1, "file": "image/tiles/Scrabble_Tile_J.jpg"},
    {"letter": "K", "points": 5, "amount": 1, "remain": 1, "file": "image/tiles/Scrabble_Tile_K.jpg"},
    {"letter": "L", "points": 1, "amount": 4, "remain": 4, "file": "image/tiles/Scrabble_Tile_L.jpg"},
    {"letter": "M", "points": 3, "amount": 2, "remain": 2, "file": "image/tiles/Scrabble_Tile_M.jpg"},
    {"letter": "N", "points": 1, "amount": 5, "remain": 5, "file": "image/tiles/Scrabble_Tile_N.jpg"},
    {"letter": "O", "points": 1, "amount": 8, "remain": 8, "file": "image/tiles/Scrabble_Tile_O.jpg"},
    {"letter": "P", "points": 3, "amount": 2, "remain": 2, "file": "image/tiles/Scrabble_Tile_P.jpg"},
    {"letter": "Q", "points": 10, "amount": 1, "remain": 1, "file": "image/tiles/Scrabble_Tile_Q.jpg"},
    {"letter": "R", "points": 1, "amount": 6, "remain": 6, "file": "image/tiles/Scrabble_Tile_R.jpg"},
    {"letter": "S", "points": 1, "amount": 4, "remain": 4, "file": "image/tiles/Scrabble_Tile_S.jpg"},
    {"letter": "T", "points": 1, "amount": 6, "remain": 6, "file": "image/tiles/Scrabble_Tile_T.jpg"},
    {"letter": "U", "points": 1, "amount": 4, "remain": 4, "file": "image/tiles/Scrabble_Tile_U.jpg"},
    {"letter": "V", "points": 4, "amount": 2, "remain": 2, "file": "image/tiles/Scrabble_Tile_V.jpg"},
    {"letter": "W", "points": 4, "amount": 2, "remain": 2, "file": "image/tiles/Scrabble_Tile_W.jpg"},
    {"letter": "X", "points": 8, "amount": 1, "remain": 1, "file": "image/tiles/Scrabble_Tile_X.jpg"},
    {"letter": "Y", "points": 4, "amount": 2, "remain": 2, "file": "image/tiles/Scrabble_Tile_Y.jpg"},
    {"letter": "Z", "points": 10, "amount": 1, "remain": 1, "file": "image/tiles/Scrabble_Tile_Z.jpg"}
];
//initialize global variables
var totalTiles = 100;
var currentScore = 0;
//one row of scrabble board
var boardImages = [];
boardImages[0] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "image/normal_space.jpg"};
boardImages[1] = { "letterMultiplier": 1, "wordMultiplier": 2, "image": "image/double_word.jpg"};
boardImages[2] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "image/normal_space.jpg"};
boardImages[3] = { "letterMultiplier": 2, "wordMultiplier": 1, "image": "image/double_letter.jpg"};
boardImages[4] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "image/normal_space.jpg"};
boardImages[5] = { "letterMultiplier": 1, "wordMultiplier": 2, "image": "image/double_word.jpg"};
boardImages[6] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "image/normal_space.jpg"};

//calculate the score earned by the entered word
function calculate_score(letterCount) {
    //get pointer to the board, and initialize variables
    var test = document.getElementById("board"), wordScoreMult = 1, totalScore = 0, currentWord = "", i = 0;

    //for length of board, check how many points the letters are worth and leter multipliers
    for (i = 0; i < test.children.length; i++) {
        totalScore += parseInt(test.children[i].getAttribute("points"));
        if (parseInt(test.children[i].getAttribute("letterMultiplier")) == 2) {
            totalScore += parseInt(test.children[i].getAttribute("points"));
        }
        if (test.children[i].getAttribute("isLetter") == "true") {
            wordScoreMult *= test.children[i].getAttribute("wordMultiplier");
            currentWord += tiles[parseInt(test.children[i].getAttribute("location"))].letter;
        }

    }

    //apply word multipliers
    totalScore = totalScore * wordScoreMult;

    //if you used all 7 letters, 50 point bonus
    if (letterCount == 7) totalScore += 50;

    //display numbers
    document.getElementById("wordScore").innerHTML = "Word Score: " + totalScore;
    document.getElementById("currentWord").innerHTML = "Current Word: " + currentWord;
}

//initilaize the board
function initialize_board() {
    //initilaize vairbale and get ponter to board location in html
    var i;
    document.getElementById("board").innerHTML = "";

    //append the board images to the html
    for (i = 0; i < boardImages.length; i++) {
        $("#board").append("<img src=" + boardImages[i].image + " wordMultiplier=" + boardImages[i].wordMultiplier + " letterMultiplier=" + boardImages[i].letterMultiplier + " points='0' space='0' location='99' height='85' class='drops dragBack' isLetter='false'/>");
    }

    //make spaces not draggable
    $(".dragBack").draggable({
        disabled: true
    });

    //make them droppable
    $(".drops").droppable({
        tolerance: "intersect",
        accept: ".drags",
        disabled: false,
        //drop event function
        drop: function (event, ui) {
            //get source of draggable event
            this.src = ui.draggable[0].src;

            //set the attributes of the space to the attributes of the letter dropped on it
            this.setAttribute("points", ui.draggable[0].getAttribute("points"));
            this.setAttribute("location", ui.draggable[0].getAttribute("location"));
            this.setAttribute("isLetter", "true");

            //check letters, if they create a word > 2 letters with no gaps, generate score.
            var firstLetter = 0, lastLetter = 0, totalLetters = 0, i = 0, check;
            for (i = 0; i < this.parentNode.children.length; i++) {
                check = this.parentNode.children[i];
                if (check.getAttribute("isLetter") === "true") {
                    lastLetter = i;
                    totalLetters++;
                }
            }
            var letters = 0;
            var end = false;
            for (i = 0; i < lastLetter; i++) {
                if (this.parentNode.children[i].getAttribute("isLetter") == "false" && end == false) {
                    letters++;
                    document.getElementById("wordScore").innerHTML = "Word Score: 0";
                    document.getElementById("currentWord").innerHTML = "Current Word: ";
                    $(this).draggable({
                        disabled: false,
                        revert: true
                    });
                    $(this).droppable({
                        disabled: true
                    });
                    calculate_score(totalLetters);
                } else if (this.parentNode.children[i].getAttribute("isLetter") == "false" && end == true) { 
                    document.getElementById("wordScore").innerHTML = "Word Score: 0";
                    document.getElementById("currentWord").innerHTML = "Current Word: invalid word";
                    $(this).draggable({
                        disabled: false,
                        revert: true,
                        opacity: 0.7, 
                        helper: "clone", 
                        revertDuration: 0
                    });
                    ui.draggable.remove();
                } else {             
                    calculate_score(totalLetters);
                    end = true; 
                }
            }
            //and remove the piece- replace the board image with piece image
            ui.draggable.remove();

            //if you drag back to rack, change image back
            $(this).draggable({
                disabled: false,
                revert: true,
                opacity: 0.7, 
                helper: "clone", 
                revertDuration: 0
            });

            $(this).droppable({
                disabled: true
            });
        }
    });
}

//initialize the letter rack
function initialize_rack(){
    //get pointer and generate random tiles
    document.getElementById("rack").innerHTML = "<br><br>";
    for(var i = 0; i < 7 && totalTiles > 6; i++){
        var temp = Math.floor(Math.random() * 25);

        while(tiles[temp].remain < 1){
            temp = Math.round(Math.random() * 25);
        }
        //add tiles to rack and remove them from the pool
        $("#rack").append("<img src=" + tiles[temp].file + " points=" + tiles[temp].points + " location=" + temp +" height='75' class='drags' id= " + tiles[temp].letter + ">");
        tiles[temp].remain -= 1;
    }
    $(".drags").draggable({
        revert: true,
    });
    initialize_board();
    totalTiles -= 7;
    document.getElementById("remainingTiles").innerHTML = "Remaining Tiles: " + totalTiles;
    document.getElementById("wordScore").innerHTML = "Word Score: 0";
    document.getElementById("currentWord").innerHTML = "Current Word: ";
}

//replace letters on rack with new random letters
function newLetters(){
    //get pointer to rack
    var currentRack = document.getElementById("rack");
    //add the current tiles back to pool
    for (i = 2; i < currentRack.childElementCount; i++){
        for(j = 0; j < 26; j++){
            if(currentRack.childNodes[i].id == tiles[j].letter){
                tiles[j].remain++;
            }
        }
    }

    //remove tiles from rack and generate new ones
    document.getElementById("rack").innerHTML = "<br><br>";
    var tileCount = 0;
    if(totalTiles > 6) tileCount = 7;
    else tileCount = totalTiles;
    for(var i = 0; i < tileCount; i++){
        var temp = Math.floor(Math.random() * 25);
        while(tiles[temp].remain < 1){
            temp = Math.round(Math.random() * 25);
        }
        $("#rack").append("<img src=" + tiles[temp].file + " points=" + tiles[temp].points + " location=" + temp +" height='75' class='drags'' id= " + tiles[temp].letter + ">");
        tiles[temp].remain -= 1;
    }
    $(".drags").draggable({
        revert: true,
    });
    initialize_board();
    document.getElementById("remainingTiles").innerHTML = "Remaining Tiles: " + totalTiles;
    document.getElementById("wordScore").innerHTML = "Word Score: 0";
    document.getElementById("currentWord").innerHTML = "Current Word: ";
}

//initilaize the game
$().ready(function () {
    //call newGame
    newGame();
    //make rack droppable
    $("#rack").droppable({
        tolerance: "intersect",
        accept: ".dragBack",
        //DROP handlers
        drop: function(event, ui){
            var location = ui.draggable[0].getAttribute("location");
            //all drop locations
            $("#rack").append("<img src=" + tiles[location].file + " points=" + tiles[location].points + " location=" + location + " height='75' class='drags'/>");
            $(".drags").draggable({
                revert: true,
            });
            //make board draggable and droppable
            var board = ui.draggable[0].parentNode;
            for(var i = 0; i < board.children.length; i++){
                if(board.children[i] == ui.draggable[0]){
                    board.children[i].src = boardImages[i].image;
                    board.children[i].setAttribute("points", "0");
                    board.children[i].setAttribute("location", "99");
                    board.children[i].setAttribute("isLetter", "false");
                    $(board.children[i]).draggable({
                        disabled: true,
                        zIndex: 1

                    });
                    $(board.children[i]).droppable({
                        tolerance: "intersect",
                        accept: ".drags",
                        disabled: false,
                        zIndex: 1
                    });
                }
            }
        }
    });
});

//ititialize new game
function newGame(){
    //reset all tiles remaining to default values
    for(var i = 0; i < tiles.length; i++){
        tiles[i].remain = tiles[i].amount;
    }

    //reset all variables to default values
    totalTiles = 100;
    //call init functions
    initialize_rack();
    initialize_board();
    currentScore = 0;
    document.getElementById("currentWord").innerHTML = "Current Word: ";
    document.getElementById("currentScore").innerHTML = "Current Score: 0";
}

//submits the word, removes letters from board, adds up score, and gives the user new tiles.
function submitWord(){
    var currentBoard = document.getElementById("board");

    //checks how long the word is
    var firstLetter = 0, lastLetter = 0, letterCount = 0, i = 0, check;
    for (i = 0; i < currentBoard.children.length; i++) {
        check = currentBoard.children[i];
        if (check.getAttribute("isLetter") === "true") {
            lastLetter = i;
            letterCount++;
        }
    }

    //check to ensure word is valid
    if(document.getElementById("currentWord").innerHTML == "Current Word: ") return false;

    //adds up points
    var test = document.getElementById("board"), wordScoreMult = 1, totalScore = 0, currentWord = "", i = 0;
    for (i = 0; i < test.children.length; i++) {
        totalScore += parseInt(test.children[i].getAttribute("points"));
        if (parseInt(test.children[i].getAttribute("letterMultiplier")) == 2) {
            totalScore += parseInt(test.children[i].getAttribute("points"));
        }
        if (test.children[i].getAttribute("isLetter") == "true") {
            wordScoreMult *= test.children[i].getAttribute("wordMultiplier");
        }
        if(test.children[i].getAttribute("isLetter") == "true")
            currentWord += tiles[parseInt(test.children[i].getAttribute("location"))].letter;
    }
    //if used all 7 letters, bonus 50 points
    totalScore = totalScore * wordScoreMult;
    if (letterCount == 7) totalScore += 50;

    //add to score and update info
    currentScore += totalScore;
    totalTiles -= letterCount;

    document.getElementById("wordScore").innerHTML = "Word Score: ";
    document.getElementById("currentWord").innerHTML = "Current Word: ";
    document.getElementById("currentScore").innerHTML = "Current Score: " + currentScore;
    
    //replace used tiles
    for(i = 0; i < letterCount && i < totalTiles; i++){
        var temp = Math.floor(Math.random() * 25);
        console.log("temp: " + temp);
        console.log("tiles[temp]: " + tiles[temp]);
        while(tiles[temp].remain < 1){
            temp = Math.round(Math.random() * 25);
            console.log("temp: " + temp);
            console.log("tiles[temp]: " + tiles[temp]);
        }
        $("#rack").append("<img src=" + tiles[temp].file + " points=" + tiles[temp].points + " location=" + temp +" height='75' class='drags' id= " + tiles[temp].letter + ">");
        tiles[temp].remain -= 1;
    }
    $(".drags").draggable({
        revert: true,
    });
    initialize_board();
    
    if(totalTiles == 0){
        document.getElementById("board").innerHTML = "GAME OVER.";
    }

    //update remaining tiles
    document.getElementById("remainingTiles").innerHTML = "Remaining Tiles: " + totalTiles; 
}