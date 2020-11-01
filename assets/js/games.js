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
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
                // break out of the loop if the money reaches 0
                break;
            }
            else {
                fight();
            }        
        }
        // FIGHT SEQUENCE

        // generate random damage value based on player's attack power
        var damage = randomNumber(playerAttack - 3, playerAttack);

        enemyHealth = Math.max(0, enemyHealth - damage);
        
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

        // generate random damage value based on enemy's attack power
        var damage = randomNumber(enemyAttack - 3, enemyAttack);

        playerHealth = Math.max(0, playerHealth - damage);
       
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
    playerHealth = 75;
    playerAttack = 10;
    playerMoney = 10;
    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0){
            // Let player know what round they are in, remember the array starts at 0 so we need to add 1 to it
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );

            // Pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyName = enemyNames[i];

            // Reset enemyHealth before starting new fight
            // math.random() *21 gives us a decimal between 0 and 20.xx, floor makes that between 0 and 20,
            // + 40 means that we have a range of 40 to 60 health for the enemy
            enemyHealth = randomNumber(40,60);

            // Use debugger to pause script from running and check what's going on at that moment in the code
            //debugger;

            // Pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);

            // if the player is still alive and we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                // ask if player wants to use the store befire next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
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
var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store?  Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                // increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            
            break;
        case "UPGRADE": // new case
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            
            break;
        case "LEAVE": // new case
        case "leave":
            window.alert("Leaving the store.");

            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;

    }
}
// Function to generate a random numeric value
var randomNumber = function(min, max) {
    // math.random() *21 gives us a decimal between 0 and 20.xx, floor makes that between 0 and 20,
    // + 40 means that we have a range of 40 to 60 health for the enemy 
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    //return returns a value but it also ends the function
    return value;
}
// start game when the page loads
startGame();