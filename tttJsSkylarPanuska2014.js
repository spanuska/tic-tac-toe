$(document).ready(function(){
	$("#names").submit(submitHandler);
});
//--------Global variables--------//
var playerA;
var playerB;
var firstPlayer;
var activePlayer;
var coinFlip = (Math.random()<0.5) ? 1 : 2;
var winner;
var winConditions;
var winX = "X,X,X";
var winO = "O,O,O";

console.log("coinFlip = " + coinFlip);

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
	console.log("The first player is " + firstPlayer + " and " + activePlayer + " is the active player.");
}

function displayFirstAndSecondPlayers(){ //function called on player name submit
	var secondPlayer = (firstPlayer == playerA) ? playerB : playerA;
	$(".thePlayers").text("The first player is " + firstPlayer + " and " + secondPlayer + " is the second player.");
	showPlayer();
}

//--------Display player order--------//
function showPlayer(){ //function called in displayFirstAndSecondPlayer() and takeTurn()
	console.log("showPlayer ran");

	if ((activePlayer == playerA) && (winner === undefined)) {
		if ($("#turn").hasClass("O")){
			$("#turn").removeClass("O");
		}
		$("#turn").addClass("X").text(playerA + ", it's your turn! Click on the '?' where you want your 'X' to go.");
	}else if ((activePlayer == playerB) && (winner === undefined)) {
		if ($("#turn").hasClass("X")){
			$("#turn").removeClass("X");
		}
		$("#turn").addClass("O").text(playerB + ", it's your turn! Click on the '?' where you want your 'O' to go.");
	}else{
		$("#turn").text("Congratulations, " + winner + " !");
	}
}

//--------Mark the game board; function called on player name submit--------//
function takeTurn(){
	$(".clickable").bind({
		click: function(){
			console.log("they clicked a clickable cell!");
			$(this).unbind('click');

			if (activePlayer == playerA){
				$(this).text("X").addClass("X");
			}else if (activePlayer == playerB) {
				$(this).text("O").addClass("O");
			}else{
				console.log("Don't make an X or an O.");
			}
			createWinConditions();
			checkForWinConditions();
		}
	});
}

//------------ID active player--------//
function assignActivePlayer(){ //function called in takeTurn()
	
	if (winner === undefined){
		activePlayer = (activePlayer != playerA) ? playerA : playerB;
	} else {
		activePlayer = undefined;
	}
	console.log("assignActivePlayer ran, and the activePlayer is now " + activePlayer);
}

function createWinConditions(){
	winConditions = [
	[$("#1").text(), $("#2").text(), $("#3").text()],
	[$("#4").text(), $("#5").text(), $("#6").text()],
	[$("#7").text(), $("#8").text(), $("#9").text()],
	[$("#1").text(), $("#4").text(), $("#7").text()],
	[$("#2").text(), $("#5").text(), $("#8").text()],
	[$("#3").text(), $("#6").text(), $("#9").text()],
	[$("#1").text(), $("#5").text(), $("#9").text()],
	[$("#3").text(), $("#5").text(), $("#7").text()]
	];

	return winConditions;
}

function checkForWinConditions(){

	for (var i=0; i<winConditions.length; i++) {
		console.log("winConditions = " + winConditions);
		console.log("winConditions[i] = " + winConditions[i]);
		console.log("winConditions[i].toString() = " + winConditions[i].toString());
		console.log("winConditions met?: " + (winConditions[i].toString() == winX) || (winConditions[i].toString() == winO));
		
		if ((winConditions[i].toString() == winX) || (winConditions[i].toString() == winO)){
			console.log("108");
			winner = (winConditions[i] == winX) ? playerA : playerB;
			//look up options for confirm
			alert(winner + " is the winner! Contgratulations!!!");
			displayGameOver();
			break;
		} else {
			console.log("120");
			continue;
		}
	}
	console.log("124");
	assignActivePlayer();
	showPlayer();
}

function displayGameOver(){
	$(".thePlayers").text("Game Over!");
}

/*Next steps:
-prompt to start the game over
-rafactor
-*/