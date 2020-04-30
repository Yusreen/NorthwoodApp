		//Change this to fix where the index is directed to
		const INDEX_HREF = "https://www.google.ca";
        
        //Get imports
		var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
		var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
		var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

		//Set up the recognition
		var back = ["back", "index", "go back", "reverse"]
		var messageRecognition = new SpeechRecognition();
		var speechRecognitionList = new SpeechGrammarList();
		messageRecognition.grammars = speechRecognitionList;

		messageRecognition.lang = "en-US";
		messageRecognition.interimResults = false;
		messageRecognition.maxAlternatives = 1;

		//Decide what to do with the results 
		messageRecognition.onresult = function(event) {
			var messageText = event.results[0][0].transcript;
			if(!back.includes(messageText.toLowerCase())) {
			    document.getElementById("message").value = document.getElementById("message").value + " " + messageText;
			} else {
				window.location = INDEX_HREF;
			}

		}

        
		messageRecognition.onerror = function(event) {
			console.log(event.message);
		}
		messageRecognition.onspeechend = function(event) {
			messageRecognition.stop();
		}

		//Need to run this function when voice 
		$(document).ready(function() {		
			$("#voice" ).on("click", function () {
			console.log('Rec Loaded');
			messageRecognition.start();
		});
});