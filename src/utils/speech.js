let voicesLoaded = false;

function loadVoices() {
  return new Promise((resolve) => {
    if (voicesLoaded) return resolve();
    const voices = speechSynthesis.getVoices();
    if (voices.length) {
      voicesLoaded = true;
      return resolve();
    }
    speechSynthesis.onvoiceschanged = () => {
      voicesLoaded = true;
      resolve();
    };
  });
}

export function speak(text, lang = 'en-US') {
  if (!window.speechSynthesis) return;

  const synth = window.speechSynthesis;

  // Cancel any ongoing speech with a small delay for mobile
  synth.cancel();

  // Keep utterance reference alive (prevents GC on mobile)
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.85;
  utter.pitch = 1;
  utter.volume = 1;

  // Resume if paused (iOS sometimes pauses)
  if (synth.paused) synth.resume();

  // On mobile, speaking must be triggered immediately in the event loop
  const doSpeak = () => {
    synth.speak(utter);
  };

  // Load voices first, then speak
  loadVoices().then(() => {
    // Small timeout helps on some mobile browsers
    setTimeout(doSpeak, 50);
  });
}
