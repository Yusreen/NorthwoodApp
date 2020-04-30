//Get imports
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

//Set up the recognition
var back = ["back", "index", "go back", "reverse"]
var navigateRecognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
navigateRecognition.grammars = speechRecognitionList;
navigateRecognition.lang = "en-US";
navigateRecognition.interimResults = false;
navigateRecognition.maxAlternatives = 1;

function navigate() {
	navigateRecognition.start()
}

navigateRecognition.onresult = function(event) {
	var results = event.results[0][0].transcript;
	if(back.includes(results.toLowerCase())) {
		alert("Navigating to homePage.html");
	    window.location = "homePage.html";
	} else {
		alert("We didn't hear a possible command!");
	}
}

navigateRecognition.onspeechend = function(event) {
	navigateRecognition.stop();
}

navigateRecognition.onerror = function(event) {
	console.log(event.message)
}