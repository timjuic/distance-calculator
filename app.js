const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let locations = [];
let n = 0;

locationInput();
function locationInput() {
    let questions = [`Enter the name of your location: `, `Enter the name of ${n}. desired location: `];
    rl.question(locations.length ? questions[1] : questions[0], function (name) { // Name input
        rl.question("Enter latitude: ", function (lat) { // Latitude input
            rl.question("Enter longitute: ", function (lng) { // longitude input
                if (!isNaN(lat) && !isNaN(lng)) {  // Test if coords are valid
                    locations.push([name, lat, lng]); // Adding location
                    n++;
                } else { // Repeat input
                    console.log('Invalid coordinate input! Input again.'); 
                    locationInput();
                }
                if (locations.length < 3) locationInput(); 
                else { // When there are more than 3 locations ask user if he wants to add more
                    rl.question('Do you want to add more locations? (y/n) : ', function (more) {
                        more === 'y' ? locationInput() : calcClosest();
                    })
                }     
            })
        });
    });
}

function calcClosest() {
    console.log("Calculating Distance...");
    for (let i = 1; i < locations.length; i++) { // Calculates distance to every location
        locations[i].push(Math.hypot(locations[0][1] - locations[i][1], locations[0][2] - locations[i][2]));
    }
    locations[0].push(0); // Giving current location distance of 0
    locations.sort((a,b) => a[3]-b[3]); // Sorting distances
    console.log('Closest desired location: ', locations[1][0]); // Logging second location (First one is current)
    rl.question('Want to add more desired locations or exit the program? (y/n): ', function (more) {
        more === 'y' ? locationInput(): rl.close();
    })
}

rl.on("close", function () {
    console.log("\nEnd of program!");
    process.exit(0);
});