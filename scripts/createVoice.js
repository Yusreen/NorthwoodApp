var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var textRecognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
textRecognition.grammars = speechRecognitionList;

textRecognition.lang = 'en-US';
textRecognition.interimResults = false;
textRecognition.maxAlternatives = 1;
textRecognition.continuous = false;

/**
 * This function just updates the text using voice
 */
function reminderText() {
    textRecognition.start();
}

textRecognition.onresult = function(event) {
    if (document.getElementById('task').value.length === 0) {
        document.getElementById('task').value = event.results[0][0].transcript;
    } else {
        document.getElementById('task').value = document.getElementById('task').value 
        + " " + event.results[0][0].transcript;
    }
}

textRecognition.onspeechend = function(e) {
    textRecognition.stop();
}