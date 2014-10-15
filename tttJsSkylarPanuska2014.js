$(document).ready(function(){
	$(".thePlayers").submit(submitHandler);
})
//--------Global variables--------//
var playerA;
var playerB;
var firstPlayer;
var activePlayer;
var coinFlip = (Math.random()<0.5) ? 1 : 2;
	
//var boardTable; (see comments about these variables at the bottom of the document)
//var cell;
//var cellID;
//var cellValue;
//var winConditions;

console.log("coinFlip = " + coinFlip); //test

//--------Submit handler--------//
function submitHandler(click){
//------------Identifying the players--------//
		playerA = $("#playerA").val();
		playerB = $("#playerB").val();

		assignFirstPlayer();
		displayFirstAndSecondPlayers();
		takeTurn();
		return false;
}

//--------Randomly decide player order--------//
function assignFirstPlayer(){ //function called on player name submit
	firstPlayer = (coinFlip == 1) ? playerA : playerB;
	activePlayer = firstPlayer;
	console.log("The first player is " + firstPlayer + " and " + activePlayer + " is the active player."); //test
}

function displayFirstAndSecondPlayers(){ //function called on player name submit
	var secondPlayer = (firstPlayer == playerA) ? playerB : playerA;
	$(".thePlayers").text("The first player is " + firstPlayer + " and " + secondPlayer + " is the second player.");
	showPlayer();
}

//--------Display player order--------//
function showPlayer(){ //function called in displayFirstAndSecondPlayer() and takeTurn()
	console.log("showPlayer ran"); //test

	if (activePlayer == playerA){
		if ($("#turn").hasClass("O")){
			$("#turn").removeClass("O");
		}
		$("#turn").addClass("X");
		$("#turn").text(playerA + ", it's your turn! Click on the '?' where you want your 'X' to go.");
	}else{
		if ($("#turn").hasClass("X")){
			$("#turn").removeClass("X");
		}
		$("#turn").addClass("O");
		$("#turn").text(playerB + ", it's your turn! Click on the '?' where you want your 'O' to go.");
	}
}

//--------Mark the game board; function called on player name submit--------//
function takeTurn(){
	$(".clickable").bind({
		click: function(){
			console.log("they clicked a clickable cell!"); //test
			$(this).unbind('click');

			if (activePlayer == playerA){
				$(this).text("X");
				$(this).addClass("X");
			}else{
				$(this).text("O");
				$(this).addClass("O");
			}
			//checkForWinConditions(?,?,?);
			
		}
	});
}

//------------ID active player--------//
function assignActivePlayer(){ //function called in takeTurn()
	activePlayer = (activePlayer != playerA) ? playerA : playerB;
	
	console.log("assignActivePlayer ran, and the activePlayer is now " + activePlayer); //test
}

function checkForWinConditions(cellID1, cellID2, cellID3){
	for (var i = 0; i<winConditions.length; i++){
		if (winConditions[i] == ["X", "X", "X"] || ["O", "O", "O"]) {

		}else{
			//assignActivePlayer();
			//showPlayer();
		}
	}
}


winConditions = [
	[$("#1").text(), $("#2").text(), $("#3").text()],
	["#4", "#5", "#6"],
	["#7", "#8", "#9"],
	["#1", "#4", "#7"],
	["#2", "#5", "#8"],
	["#3", "#6", "#9"],
	["#1", "#5", "#9"],
	["#3", "#5", "#7"]
];

/* -------- pseudocode for checking win condition --------
function checkForWin(winConditions){
	loop through winConditions, 
		if all 3 spots == X || O,
			player wins!
			prompt to start over;


/*Next steps:
X-Prohibit clicking on a cell that's already been clicked (unbind click)
-Build a way to store board so that after each turn the program can...
-Compare the state of the board to win conditions in order to...
-(May need to modify winConditions() as written, depending on how comparison works)
-Identify the winner
-Display winner & prompt to start the game over
-*/