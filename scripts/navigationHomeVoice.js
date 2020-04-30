var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var possibleChat = ["Chat",  "Talk", "Conversation"];
var possibleMemos = ["Memos", "Memo", "Notes"];
var possibleReminders = ["View", "View Reminder", "View Reminders", "See Reminders", "Create Reminders", "Create Reminder", "Reminders", "Reminder", "Remember"];
var possibleCalendar = ["View Calendar", "Calendar", "See Calendar", "Calendar of Events", "Events"];
var possibleLogOut = ["Log out", "Log off", "Sign Out", "Sign Off"];
var grammar = '#JSGF V1.0; grammar locations; public <location> = ' + possibleReminders.join(' | ') + ' | ' 
+ possibleMemos.join(' | ') +  ' | ' + possibleChat.join(' | ') + ' | ' + possibleCalendar.join(' | ') + ' | ' + possibleLogOut.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var SpeechRecognitionList = new SpeechGrammarList();
SpeechRecognitionList.addFromString(grammar, 1);
recognition.grammars = SpeechRecognitionList;
recognition.maxAlternatives = 1;

function reminderNavigation(event) {
    recognition.start();
}

recognition.onresult = function(event) {
	//Store the results
	var location = event.results[0][0].transcript;
	var match = false;

	//Decide what set of possible words the results match
	for (var i = possibleChat.length - 1; i >= 0; i--) {
	    if (location.toLowerCase() === possibleChat[i].toLowerCase()) {
	    	location = "chat.php";
	        match = true;
	    }
	    
	}
	
	for (var i = possibleReminders.length - 1; i >= 0; i--) {
	    if (location.toLowerCase() === possibleReminders[i].toLowerCase()) {
	    	location = "reminderPage.html";
	    	match = true;
	    }

	}

	for (var i = possibleCalendar.length - 1; i >= 0; i--) {
		if (location.toLowerCase() === possibleCalendar[i].toLowerCase()) {
			location = "calendar.html";
			match = true;
		}
	}

	for (var i = possibleMemos.length - 1; i >= 0; i--) {
		if (possibleMemos[i].toLowerCase() === location.toLowerCase()) {
			location = "Memo.html";
			match = true;
		}
	}

	for (var i = possibleLogOut.length - 1; i >= 0; i--) {
	    if (possibleLogOut[i].toLowerCase() === location.toLowerCase()) {
	    	location = "logout.php";
	    	match = true;
	    } 
	}

	//Decide what the results mean
	if (match) {
		alert("Decision reached: Navigating to " + location);

		window.location = location;
	} else {
		recognition.onnomatch();
	}
	
}

recognition.onspeechend = function(e) {
	recognition.stop();
}

recognition.onnomatch = function(e) {
	alert("You didn't issue a possible command!!");
}

recognition.onerror = function(e) {
	alert("Sorry, there is an issue with Speech Recognition at the moment...." + e.error);
}
