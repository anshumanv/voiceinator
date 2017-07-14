window.addEventListener('load', function () {

	const msg = new SpeechSynthesisUtterance();
	let voices = [];
	const voicesDropdown = document.querySelector('[name="voice"]');
	const options = document.querySelectorAll('[type="range"], [name="text"]');
	const speakButton = document.querySelector('#speak');
	const stopButton = document.querySelector('#stop');

	msg.text = document.querySelector('[name = "text"]').value;

	function populateVoices() {
		voices = this.getVoices();
		voicesDropdown.innerHTML = voices
			.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang}) </option>`)
			.join('');
		
	}

	function setVoice() {
		msg.voice = voices.find(voice => voice.name === this.value);
		toggle();
	}

	// A function to handle play/pause.
	function toggle(startOver = true) {
		speechSynthesis.cancel();
		if(startOver){
			speechSynthesis.speak(msg);
		}
	}

	function setOption() {
		msg[this.name] = this.value;
		toggle();
	}

	voicesDropdown.addEventListener('change', setVoice);	// Listen for voice selection in voices dropdown
	speechSynthesis.addEventListener('voiceschanged', populateVoices);	// load available voices in the dropdown
	options.forEach(option => option.addEventListener('change', setOption));	// make relevant changes on changing input fields
	speakButton.addEventListener('click', toggle);	// Speak Button
	stopButton.addEventListener('click', () => toggle(false));	// Stop Button
})