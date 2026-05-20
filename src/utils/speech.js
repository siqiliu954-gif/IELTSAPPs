let voicesReady = false;

function ensureVoices(synth) {
  if (voicesReady) return;
  const voices = synth.getVoices();
  if (voices.length) { voicesReady = true; return; }
  synth.onvoiceschanged = () => { voicesReady = true; };
}

export function speak(text, lang = 'en-US') {
  const synth = window.speechSynthesis;
  if (!synth) return;

  synth.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 0.85;
  utter.pitch = 1;
  utter.volume = 1;

  ensureVoices(synth);

  // Direct call from event handler context — critical for mobile
  synth.speak(utter);
}
