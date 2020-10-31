// Game States:
// "WIN" - Player ronot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

// Global variables:
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 50; //should be 100
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this:
//console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 25; //should be 50
var enemyAttack = 12;
/*
console.log(enemyNames);
console.log(enemyNames.length);
for(var i = 0; i < enemyNames.length; i++) {
    console.log(enemyNames[i]);
    console.log(i);
    console.log(enemyNames[i] + " is at " + i + " index");
} */

var fight = function(enemyName) {
    // repeat and execute as long as the enemy-robot is alive AND the player is still alive
    while(enemyHealth > 0 && playerHealth > 0) {
            
        // Alert players that they are starting the round
        //window.alert("Welcome to Robot Gladiators!");

        // Ask the playwe whether they want to fight or skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        //console.log(promptFight);

        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave the fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight.  Goodbye!");
                // substract money from playerMoney for skipping
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                // break out of the loop if the money reaches 0
                break;
            }
            else {
                fight();
            }        
        }
        // FIGHT SEQUENCE

        // remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");

            // award player money for winning
            //playerMoney = playerMoney + 20;

            // leave while() loop since enemy is dead
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // remove player's health by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );

        // Check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            // this breaks us out of the loop if we have died
            break;
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
      
        
        /*else {
            window.alert("You need to choose a valid option.  Try again!");
        }
        */
    }

}

// function to start a new game
var startGame = function() {
    // reset player stats
    playerHealth = 50;
    playerAttack = 10;
    playerMoney = 10;
    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0){
            // Let player know what round they are in, remember the array starts at 0 so we need to add 1 to it
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );

            // Pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            // Reset enemyHealth before starting new fight
            enemyHealth = 25; //should be 50

            // Use debugger to pause script from running and check what's going on at that moment in the code
            //debugger;

            // Pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
}
// function to end the entire game
var endGame = function() {
    // if player is still alive, player wins!
    if (playerHealth >0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}
// start game when the page loads
startGame();