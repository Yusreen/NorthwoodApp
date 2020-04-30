function submitMemo() {
    //Get the information for the memo
    var memoText = document.getElementById("memoText").value;
    var today = new Date();


    //Create an object containing the info
    var memo = {
        memoText: memoText,
        date: today.valueOf()
    };

    //Get the list of previous memos from localStorage and check to see whether
    //it has items in it
    var memoSet = localStorage.getItem("memoSet");

    if (memoSet === null) {
        memoSet = [];
    } else {
        memoSet = JSON.parse(memoSet);
    }

    //Reset the newly appended list of memos to localStorage
    memoSet.push(memo);
    localStorage.setItem("memoSet", JSON.stringify(memoSet));

    //Display it on end of the page
    var listElement = document.createElement("li");
    var node = document.createTextNode("Created " + today.toLocaleDateString() +
        " " + today.toLocaleTimeString() +
        "\n Memo: " + memo.memoText);
    listElement.appendChild(node);
    document.getElementById("memoList").appendChild(listElement);
    document.getElementById("memoForm").reset();
}

/**
 * This fucnction pulls the list of memos from localStorage and
 * displays them in an orderly manner.
 */
function displayMemos() {
    //Get the list of memos and check to see if it is empty
    var memoSet = localStorage.getItem("memoSet");
    if (memoSet !== null) {
        memoSet = JSON.parse(memoSet);

        //display each memo in the order they were created
        for (var i = 0; i < memoSet.length; i++) {
            var date = new Date(memoSet[i].date);
            var memo = memoSet[i].memoText;

            var d = date.toDateString() + " " + date.toLocaleTimeString();

            //Make a delete button with functionality and append it to the list element
            var deleteButton = document.createElement("input");
            deleteButton.type = "submit";
            deleteButton.value = "delete";
            deleteButton.id = i;
            deleteButton.onclick = function () {
                //Get the memoSet object again
                var set = localStorage.getItem("memoSet");
                set = JSON.parse(set);

                //Remove the object that called the function from the
                //memoSet object and store the object again
                var i = this.id;
                set.splice(i, 1);
                localStorage.setItem("memoSet", JSON.stringify(set));

                //Remove everything from the listsapce and then redisplay
                //them, minus the deleted object.
                var myNode = document.getElementById("tbody");
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }
                displayMemos();
            };

            //Make an edit button with functionality and append it to the list element
            
            var editButton = document.createElement("input");
            editButton.type = "button";
            editButton.value = "edit";
            editButton.id = "edit";
            editButton.name = i;

            //Add funtionality
            editButton.onclick = function() {
				//Get the memos object to retrieve the current text
				var memos = localStorage.getItem("memoSet");
				var memos = JSON.parse(memos);
				var memoText = memos[this.name].memoText;

			    //Set up the pop up window
			    var modalWindow = document.getElementById("edit-popup");
			    document.getElementById("text-edit").value = memoText;

			    //Add the functionality to save the information
			    var closeButton = document.getElementById("closeButton");
			    closeButton.name = this.name;
			    closeButton.onclick = function() {
			    	//Set the new text as the memoText for the memo
			    	memoText = document.getElementById("text-edit").value;
			    	memos[this.name].memoText = memoText;

			    	//Send it back to storage and redisplay everything
			    	localStorage.setItem("memoSet", JSON.stringify(memos));
			    	var myNode = document.getElementById("tbody");
			        while (myNode.firstChild) {
			            myNode.removeChild(myNode.firstChild);
			        }
			        displayMemos();

			    	document.getElementById("edit-popup").style.display = "none";
			    }
			    modalWindow.style.display = "block";
			};

            //Creating table elements
            var tableRow = document.createElement("tr");
            var tableD1 = document.createElement("td");
            var tableD2 = document.createElement("td");
            var tableD3 = document.createElement("td");
            var tableD4 = document.createElement("td");

            //Appending text content
            tableD1.textContent = d;
            tableD2.textContent = memo;

            //Appending buttons
            tableD3.appendChild(deleteButton);
            tableD4.appendChild(editButton);

            //Appending the data to the row 
            tableRow.appendChild(tableD1);
            tableRow.appendChild(tableD2);
            tableRow.appendChild(tableD3);
            tableRow.appendChild(tableD4);

            //Append the row on the table
            document.getElementById("tbody").appendChild(tableRow);
        }
    }
}

