// Array Declaration
var puzzleMemory = ['A', 'A', 'B', 'B', 'C', 'C','D','D','F','F','I','I','J','J','K','K','M','M','Z','Z'];
// ,'D','D','F','F','I','I','J','J','K','K','M','M','Z','Z'
var comparisonArray = [];
var cardSerialId = [];
var tilesFlippedCount = 0;
var moveCounter = 0;
var starCount = 0;
var set_interval = setInterval(setTimer, 1000);

memoryTileShuffle = function(puzzleMemory) {

    // console.log(this.length);
    var x = puzzleMemory.length,
        y;
    while (--x > 0) {
        y = Math.floor(Math.random() * (x + 1));
        // console.log('shuffling',j);
        swap(puzzleMemory, y, x);
        // console.log(this);
    }
}

function swap(arr, y, x) {
    var temp;
    temp = arr[y];
    arr[y] = arr[x];
    arr[x] = temp;
}


function createIntialPuzzle() {

    // setTimer();
    tilesFlippedCount = 0;
    var appendHtml = '';
    memoryTileShuffle(puzzleMemory);
    // For appending HTML #writing html using js !
    for (var i = 0; i < puzzleMemory.length; i++) {
        appendHtml += '<div class = "col-lg-2 col-md-2 col-sm-3 col-xs-3 custom-style-div" id="tile_' + i + '" onclick="clickedCard(this,\'' + puzzleMemory[i] + '\')"></div>';
    }
    document.getElementById('puzzle').innerHTML = appendHtml;
}


function clickedCard(card, value) {

    if (card.innerHTML == "" && comparisonArray.length < 2) {

        moveCounter++;
        var y = document.getElementById('counter')
        y.innerHTML = "Move Count: " + moveCounter;

        // Hiding stars when user exceeds 40 Moves 
        if (moveCounter > 40) {
            var hideStarOne = document.getElementById('star-one');
            hideStarOne.style.display = 'none';
        }

        // Hiding second star when user exceeds 55 Moves 
        if (moveCounter > 55) {
            var hideStarTwo = document.getElementById('star-two');
            hideStarTwo.style.display = 'none';
        }


        card.style.background = '#FFF';

        card.innerHTML = value;

        if (comparisonArray.length == 0) {

            comparisonArray.push(value);
            cardSerialId.push(card.id);

        } else if (comparisonArray.length == 1) {

            comparisonArray.push(value);
            cardSerialId.push(card.id);

            if (comparisonArray[0] == comparisonArray[1]) {

                tilesFlippedCount += 2;
                // Clear both arrays
                comparisonArray = [];
                cardSerialId = [];
                // Check to see if the whole puzzle is cleared

                if (tilesFlippedCount == puzzleMemory.length) {

                    // show Model when User wins the Game

                    $("#myModal").modal();

                    // Close Model when user restarts Game
                    $('.restart-btn').on('click', function() {
                        $('#myModal').modal('hide');
                    })

                    clearTimer();
                    whenUserWins();
                }

            } else {

                setTimeout(revert, 700);
            }
        }
    }
}

function clearTimer() {

    // Clear Timer when user wins the Game
    clearInterval(set_interval);
}

function revert() {
    // revert the tiles back over
    var cardOne = document.getElementById(cardSerialId[0]);
    var cardTwo = document.getElementById(cardSerialId[1]);

    cardOne.style.background = 'url(../custom_images/icon.jpg) no-repeat';

    cardOne.innerHTML = "";
    cardTwo.style.background = 'url(../custom_images/icon.jpg) no-repeat';

    cardTwo.innerHTML = "";
    // Clear both arrays
    comparisonArray = [];
    cardSerialId = [];
}


function whenUserWins() {



    // Model Content showing total time taken by user
    var totalTimeTaken = document.getElementById('timer').innerHTML;
    var appendTimeModal = document.getElementById('modal-time');
    appendTimeModal.innerHTML = totalTimeTaken;

    // Model Content showing remainng stars
    var starLeft = document.querySelectorAll('.star-count');
    // console.log(starLeft);

    // Condition to check unhidden stars
    starLeft.forEach(function(element) {
        if (element.style.display !== 'none') {
            starCount++
        };
    });

    var html = '';

    for (var i = 0; i < starCount; i++) {
        console.log(starCount);
        html = html + '<span class="glyphicon glyphicon-star-empty"></span>'
    }


    var modelStar = document.getElementById('modal-star');


    modelStar.innerHTML = "Star Rating : " + html;
    // document.getElementById('puzzle').innerHTML = "";

}

function restart() {

    createIntialPuzzle();
    window.timeStamp = Math.floor(Date.now() / 1000);
    moveCounter = 0;
    starCount = 0;
    var y = document.getElementById('counter')
    y.innerHTML = "Move Count: " + moveCounter;

    // Unhiding stars when game restarts
    var showStarOne = document.getElementById('star-one');
    showStarOne.style.display = 'block';

    var showStarTwo = document.getElementById('star-two');
    showStarTwo.style.display = 'block';

    //  resetting timer when game restarts
    set_interval = setInterval(setTimer, 1000);
}

function setTimer() {
    // console.log(Math.floor(Date.now() / 1000) - window.timeStamp);
    var x = document.getElementById('timer')
    // Logic for timer
    x.innerHTML = "Time spent : " + (Math.floor(Date.now() / 1000) - window.timeStamp) + " Seconds";
}

window.onload = function() {
    createIntialPuzzle();
    window.timeStamp = Math.floor(Date.now() / 1000);
    // window.moveCounter = 0;
};