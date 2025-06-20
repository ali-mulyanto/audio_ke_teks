if ("webkitSpeechRecognition" in window) {
const av = document.getElementById('audio');


  let speechRecognition = new webkitSpeechRecognition();
  let final_transcript = "";

  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = document.querySelector("#select_dialect").value;

  speechRecognition.onstart = () => {
    document.querySelector("#status").style.display = "block";
  };
  speechRecognition.onerror = () => {
    document.querySelector("#status").style.display = "none";
    console.log("Speech Recognition Error");
  };
  speechRecognition.onend = () => {
    document.querySelector("#status").style.display = "none";
    console.log("Speech Recognition Ended");
  };

  speechRecognition.onresult = (event) => {
    let interim_transcript = "";

    var spasi = ". <br> :".repeat(1);
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript +spasi;
         } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    
    document.querySelector("#final").innerHTML = final_transcript;
    document.querySelector("#interim").innerHTML =  interim_transcript;
   
  };

  document.querySelector("#start").onclick = () => { 
    speechRecognition.lang = document.querySelector("#select_dialect").value;
    speechRecognition.start();
    av.play();
    
  };
  document.querySelector("#stop").onclick = () => {
    speechRecognition.stop();
    av.pause(); 
  };

 document.querySelector("#clear").onclick = () => {
 
  };


} else {
  console.log("Speech Recognition Not Available");
}
