import { useState, useEffect } from "react";

const App = () => {

  const [voices, setVoices] = useState({})

  const [play, setPlay] = useState(false)
  const [voice, setVoice] = useState(0)
  const [text, setText] = useState('Que pasa con vos maricón reconchetumare')

  const setVoiceChange = (e) => {
    setVoice(e.target.value)
  };

  const setTextChange = (e) => {
    setText(e.target.value)
  };

  const readText = () => {
    let msg = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices();
    msg.lang = 'es-ES'
    msg.voice = voices[voice]
    msg.volume = 1
    msg.rate = 0.8
    msg.pitch = 1
    msg.text = text

    msg.onstart = (e) => {
      setPlay(true)
      console.log('Reading " ' + e.currentTarget.text + ' "');
    };

    msg.onend = (e) => {
      setPlay(false)
      console.log('Finished in ' + (e.elapsedTime / 1000).toFixed(1) + ' Seconds');
    };

    speechSynthesis.speak(msg);
  }

  useEffect(() => {
    const awaitVoices = new Promise(done => speechSynthesis.onvoiceschanged = done);

    awaitVoices.then(() => {
      let getVoices = speechSynthesis.getVoices();
      let id = 0
      let objVoice = []

      getVoices.forEach(voice => {
        objVoice.push({
          id: id,
          name: voice.name,
          lang: voice.lang.toUpperCase(),
          localService: voice.localService
        })
        id++
      });

      objVoice.sort((a, b) => (a.lang > b.lang) ? 1 : -1)
      setVoices(objVoice)
    });
  }, []);

  return (
    <div className="flex items-center justify-center py-12 px-10 sm:px-10 lg:px-10">
      <div className="max-w-md w-full space-y-6">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Streamers Speak</h2>
          <p className="mt-1 text-center text-sm text-gray-600">
            <span className="text-1xl text-indigo-600 hover:text-indigo-500">
              Reader of messages sent by viewers
            </span>
          </p>
        </div>

        <div className="rounded-md shadow-sm">
          <select
            id="country"
            name="country"
            autoComplete="country-name"
            onChange={setVoiceChange}
            className="relative w-full px-5 pt-3.5 pb-4 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          >
            {Object.keys(voices).map((voice, i) => (
              <option key={i} value={voices[voice].id}>{voices[voice].name} | {voices[voice].lang}</option>
            ))}
          </select>
        </div>

        <div className="rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Write something here
            </label>
            <input
              type="text"
              name="text"
              value={text}
              onChange={setTextChange}
              autoComplete="Off"
              className="appearance-none relative w-full px-5 pt-3.5 pb-4 border border-gray-300 placeholder-gray-300 text-gray-900 rounded-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Write something here"
            />
          </div>
        </div>
        <div>

          {play ? (
            <>
              <div
                className="text-lg text-center relative w-full pt-2 pb-2.5 rounded-full text-white bg-gray-400"
              >
                Reading text...
              </div>
            </>
          ) : (
            <>
              <button
                className="text-lg relative w-full pt-2 pb-2.5 rounded-full text-white bg-indigo-600 hover:bg-indigo-500"
                onClick={readText}
              >
                Read the text now
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  )
};

export default App;
