import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './App.scss';

type Clip = {
  id: string;
  link: string;
  text: string;
};

const clips: Clip[] = [
  {
    id: 'Q',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    text: 'Heater 1',
  },
  {
    id: 'W',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    text: 'Heater 2',
  },
  {
    id: 'E',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    text: 'Heater 3',
  },
  {
    id: 'A',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    text: 'Heater 4',
  },
  {
    id: 'S',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    text: 'Clap',
  },
  {
    id: 'D',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    text: 'Open-HH',
  },
  {
    id: 'Z',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    text: 'Kick-n\'-Hat',
  },
  {
    id: 'X',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    text: 'Kick',
  },
  {
    id: 'C',
    link: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    text: 'Closed-HH',
  },
];

function App() {
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (clip: Clip) => {
    setSelectedClip(clip);
    setIsPressed(true);

    const audio = document.querySelector(`#${clip.id}`) as HTMLMediaElement;

    audio.play();

    setTimeout(() => setIsPressed(false), 300);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const rightClip = clips.find(
      clip => clip.id.toLowerCase() === e.key.toLowerCase(),
    );

    if (!rightClip) {
      return;
    }

    handleClick(rightClip);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="App">
      <div className="drum-machine" id="drum-machine">
        <div className="display" id="display">{selectedClip?.text}</div>
        <div className="pad-container">
          {clips.map(clip => {
            const isSelected = selectedClip?.id === clip.id;

            return (
              <button
                key={clip.id}
                type="button"
                id={clip.text}
                onClick={() => handleClick(clip)}
                className={classNames(
                  'drum-pad',
                  { 'drum-pad--active': isPressed && isSelected },
                )}
              >
                <audio
                  src={clip.link}
                  className="clip"
                  id={clip.id}
                />
                {clip.id}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
