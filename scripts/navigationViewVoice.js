//Get imports
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

//Set up the recognition
var back = ["back", "index", "go back", "reverse"]
var viewRecognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
viewRecognition.grammars = speechRecognitionList;
viewRecognition.lang = "en-US";
viewRecognition.interimResults = false;
viewRecognition.maxAlternatives = 1;

function viewRecog() {
	viewRecognition.start()
}

//Decide what to do with the results 
viewRecognition.onresult = function(event) {
	var messageText = event.results[0][0].transcript;

	if(back.includes(messageText.toLowerCase())) {
	    window.location = "ReminderIndex.html";
	} else {
		alert("The voice we received did not match a list of possible commands");
	}
}

viewRecognition.onerror = function(event) {
	console.log(event.message);
}
viewRecognition.onspeechend = function(event) {
	viewRecognition.stop();
}