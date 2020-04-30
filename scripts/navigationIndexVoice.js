var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var possibleCreate = ["Create",  "New Reminder", "Create a New Reminder"];
var possibleBack = ["Back", "Go Back", "Reverse"];
var possibleView = ["View", "View Reminder", "View Reminders", "See Reminders"];
var grammar = '#JSGF V1.0; grammar locations; public <location> = ' + possibleView.join(' | ') + ' | ' + possibleCreate.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

function reminderNavigation(event) {
    recognition.start();
}

recognition.onresult = function(event) {
	//Store the results
	var location = event.results[0][0].transcript;
	var match = false;

	//Decide what set of possible words the results match
	for (var i = possibleCreate.length - 1; i >= 0; i--) {
	    if (location.toLowerCase() === possibleCreate[i].toLowerCase()) {
	    	location = "CreateReminder.html";
	        match =true;
	    }
	    
	}
	
	for (var i = possibleView.length - 1; i >= 0; i--) {
	    if (location.toLowerCase() === possibleView[i].toLowerCase()) {
	    	location = "ViewReminders.html";
	    	match = true;
	    }

	}

	for (var i = possibleBack.length - 1; i >= 0; i--) {
	    if (possibleBack[i].toLowerCase() === location.toLowerCase()) {
	    	location = "//google.ca";
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
