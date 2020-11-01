// Game States:
// "WIN" - Player ronot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less



/*
console.log(enemy.names);
console.log(enemy.names.length);
for(var i = 0; i < enemy.names.length; i++) {
    console.log(enemy.names[i]);
    console.log(i);
    console.log(enemy.names[i] + " is at " + i + " index");
} */

var fight = function(enemy) {
    // repeat and execute as long as the enemy-robot is alive AND the player is still alive
    while(enemy.health > 0 && playerInfo.health > 0) {
            
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
                window.alert(playerInfo.name + " has decided to skip this fight.  Goodbye!");
                // substract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                // break out of the loop if the money reaches 0
                break;
            }
            else {
                fight();
            }        
        }
        // FIGHT SEQUENCE

        // generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);
        
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        // Check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");

            // award player money for winning
            playerInfo.money = playerInfo.money + 20;

            // leave while() loop since enemy is dead
            break;
        }
        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // generate random damage value based on enemy's attack power
        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);
       
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // Check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            // this breaks us out of the loop if we have died
            break;
        }
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
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
    playerInfo.reset();
    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0){
            // Let player know what round they are in, remember the array starts at 0 so we need to add 1 to it
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );

            // Pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];

            // Reset enemy.health before starting new fight
            // math.random() *21 gives us a decimal between 0 and 20.xx, floor makes that between 0 and 20,
            // + 40 means that we have a range of 40 to 60 health for the enemy
            pickedEnemyObj.health = randomNumber(40,60);

            // Use debugger to pause script from running and check what's going on at that moment in the code
            //debugger;

            // Pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);

            // if the player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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
    if (playerInfo.health >0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
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
// funciton for shop
var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store?  Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
            playerInfo.refillHealth();            
            break;
        case "UPGRADE": // new case
        case "upgrade":
            playerInfo.upgradeAttack();            
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

// Global variables:
var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attck: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -+ 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attck += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        } 
    }
};

// You can also log multiple values at once like this:
//console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Andriod",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// start game when the page loads
startGame();