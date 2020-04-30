/*
 * This function ensures the user has entered a viable date for a reminder, then saves
 * the reminder as a JSON object in local storage using the date as a key to access the 
 * reminder
 */
function saveReminder() {
    try {
        //Convert the date inputted by the user to a valid one for our JSON
        var d = new Date(document.getElementById('date').value);
        d.setDate(d.getDate() + 1);
        d.setHours(document.getElementById('hour').value);
        d.setMinutes(document.getElementById('minute').value);
        var task = document.getElementById('task').value;


        //Check the to make sure the reminder is past the current date and time
        if (d.valueOf() > (currentDate.valueOf())) {
            console.log(d);

            //Create the JSON object
            var reminder = {
                date: d.valueOf(),
                name: document.getElementById('name').value,
                task: document.getElementById('task').value
            };

            //Reset the input boxes
            document.getElementById('reminderForm').reset();
            document.getElementById("task").value = null;


            //Retreieve the list of previously saved reminders from local Storage
            var reminderSet = localStorage.getItem("reminderSet");

            //Create a new aarray of reminders if none are saved
            if (reminderSet === null) {
                reminderSet = [];
            } else { //Otherwise make the current list into a JSON object
                reminderSet = JSON.parse(reminderSet);
            }

            //Append the reminder to the list of reminders
            reminderSet.push(reminder);

            //Upload the list of reminders back to localStorage
            localStorage.setItem("reminderSet", JSON.stringify(reminderSet));

            var myNode = document.getElementById("reminderList");
            if (myNode !== null) {
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }
            }
            showReminders();


        } else { //If it isn't, tell the user and don't save the reminder
            alert("Your reminder has not been saved!\nWe cannot go back to the past!!");
        }

    } catch (e) {
        /* Google browsers use different error 
         * constant
         */
        if (window.navigator.vendor ===
                "Google Inc.") {
            if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                alert(
                        "Error: Local Storage limit exceeds."
                        );
            }
        } else if (e == QUOTA_EXCEEDED_ERR) {
            alert("Error: Saving to local storage.");
        }

        console.log(e);
    }//end try-catch()
    //Store the JSON in localstorage
}