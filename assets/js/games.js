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

for(var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 25; //should be 50
    //debugger;
    fight(pickedEnemyName);
}