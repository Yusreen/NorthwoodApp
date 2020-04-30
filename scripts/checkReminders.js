//This will get the current date of the system
var currentDate = new Date();

/*
 * This function creates updates the date on the page,
 * as well as checks reminders if a minute has passed
 */
function doDate() {
    //Create a date object with the current date
    var d = new Date();
    
    if (d.getMinutes() !== currentDate.getMinutes()) {
        currentDate = d;
        checkReminders();
    }

    
    if (document.getElementById('title').innerHTML === "Reminders") {
        var n = d.toLocaleTimeString();
        document.getElementById("time").innerHTML =
                "The time is currently " + n + ".";
    }

}

//This line performs the doDate function every 1000 ms, or every second
setInterval(doDate, 1000);

/*
 * This function checks the list of reminders - if one exists -
 * and alerts the user if a reminder has been set for this time
 */
function checkReminders() {

    //retrieve JSON object
    var reminderSet = localStorage.getItem("reminderSet");
    reminderSet = JSON.parse(reminderSet);
    
    //verify that there is a reminder saved
    if (reminderSet !== null) {

        //Make a counter to keep track of how many reminders were set for this time
        var counter = 0;

        //Look the list of reminders
        for(i=0; i < reminderSet.length; i++){
            console.log("Reminder " + i + " date: " + reminderSet[i].date);
            
            //If a saved reminder's date matches the one the current time, 
            //notify the user and delete the reminder
            if((reminderSet[i].date / 1000) === Math.floor(currentDate.valueOf() / 1000)){
                alert(reminderSet[i].task);
                counter++;
                
            } else if (reminderSet[i].date < currentDate) {//Deletes any old reminders
                localStorage.removeItem(reminderSet[i].date.valueOf());
                counter++;
            }
        }

        //Delete as many items as in counter
        //Since reminders are arranged in chronological order,
        //index will always be 0.
        reminderSet.splice(0, counter);

        //Reupload list of reminders
        localStorage.setItem("reminderSet", JSON.stringify(reminderSet));

        //If user is on "View Reminders page", update the page when reminders are deleted
        if (document.getElementById("title").innerHTML === "View Your Reminders" && counter > 0) {
            showReminders();
        }
    }
}