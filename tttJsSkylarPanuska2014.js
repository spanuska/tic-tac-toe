$(document).ready(function(){
	$("#thePlayers").submit(submitHandler)
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
	$("#thePlayers").html("The first player is " + firstPlayer + " and " + secondPlayer + " is the second player.");	
	$("#thePlayers").css("background-color", "#B36DB4");
	showPlayer();
}

//--------Display player order--------//
function showPlayer(){ //function called in displayFirstAndSecondPlayer() and takeTurn()
	console.log("showPlayerOrder ran") //test
	if (activePlayer == playerA){
		$("#turn").css("background-color", "#97DB97");
		$("#turn").html(playerA + ", it's your turn! Click on the '?' where you want your 'X' to go.");
	}else{
		$("#turn").css("background-color", "#0099CC");
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
				$(this).css("background-color", "#97DB97");
				$(this).css("border", "1px", "solid", "black");
			}else{ 
				$(this).text("O");
				$(this).css("background-color", "#0099CC");
				$(this).css("border", "1px", "solid", "black");	
			};
			
			assignActivePlayer();
			showPlayer();
		}
	});
}

//------------ID active player--------//
function assignActivePlayer(){ //function called in takeTurn()
	activePlayer = (activePlayer != playerA) ? playerA : playerB;
	
	console.log("assignActivePlayer ran, and the activePlayer is now " + activePlayer); //test
}

function checkForWinConditions(){

}


//-JP's suggestion: get element by id, get text, make function that takes 3 parameters, check if all 3 are the same and not "?"

winConditions = {
	[("#a1" "X", "#a2" = "X", "#a3" = "X"} || ],
	["#b1", "#b2", "#b3"],
	["#c1", "#c2", "#c3"],
	["#a1", "#b1", "#c1"],
	["#a2", "#b2", "#c2"],
	["#a3", "#b3", "#c3"],
	["#a1", "#b2", "#c3"],
	["#a3", "#b2", "#c1"]
};*/

/* -------- pseudocode for checking win condition --------
function checkForWin(winConditions){
	loop through winConditions, 
		if all 3 spots == X || O,
			player wins!
			prompt to start over;

//------------Create table object (part of checking for win condition, would be part of takeTurn()...(not working yet!)--------//
I started trying to generate this table in order to check against the win conditions but couldn't get it to work in time.


/*Next steps:
X-Prohibit clicking on a cell that's already been clicked (unbind click)
-Build a way to store board so that after each turn the program can...
-Compare the state of the board to win conditions in order to...
-(May need to modify winConditions() as written, depending on how comparison works)
-Identify the winner
-Display winner & prompt to start the game over
-*/