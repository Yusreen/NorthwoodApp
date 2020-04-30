//Get imports
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

//Set up the recognition
var back = ["back", "index", "go back", "reverse"]
var memoRecognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
memoRecognition.grammars = speechRecognitionList;
memoRecognition.lang = "en-US";
memoRecognition.interimResults = false;
memoRecognition.maxAlternatives = 1;

function memoRecog() {
	memoRecognition.start()
}

//Decide what to do with the results 
memoRecognition.onresult = function(event) {
	var messageText = event.results[0][0].transcript;
	document.getElementById("memoText").value = document.getElementById("memoText").value + " " + messageText;
}

memoRecognition.onerror = function(event) {
	console.log(event.message);
}
memoRecognition.onspeechend = function(event) {
	memoRecognition.stop();
}