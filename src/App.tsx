import React from 'react'
import './App.css'

const COUNT_DOWN_TIME = 10;

function App() {
  const [time, setTime] = React.useState(COUNT_DOWN_TIME);
  const [value, update] = React.useReducer(x => x + 1, 0); 
  const timer = React.useRef<number>();
  const ref = React.useRef<HTMLAudioElement>(null);
  const [audioReady, setAudioReady] = React.useState(false);

  const onCanPlayThrough = React.useCallback(() => {
    setAudioReady(true);
  }, []);

  React.useEffect(() => {
    if(value > 0) {
      timer.current = window.setInterval(() => {
        setTime(t => t - 1);
      }, 1000);
    }
  }, [value]);

  React.useEffect(() => {
    if(time === 0) {
      window.clearInterval(timer.current);
      ref.current?.play();
    }
  }, [time]);

  React.useEffect(() => {
    ref.current?.load();
  }, []);

  const onClick = React.useCallback(() => {
    if(value === 0) {
      setTime(t => t - 1);
      update();
    } else {
      window.clearInterval(timer.current);
      setTime(COUNT_DOWN_TIME);
      ref.current?.pause();
      if(ref.current) {
        ref.current.currentTime = 0;
      }
      update();
    }
  }, [value])

  return (
    <div className="main" onClick={onClick}>
      <div className="time">{time}</div>
      <div className="loading">{audioReady ? "Ready" : "Loading"}</div>
      <audio
        ref={ref}
        className="audio"
        preload="metadata"
        controls
        src="/audio/alarm.mp3"
        playsInline
        autoPlay={false}
        onCanPlayThrough={onCanPlayThrough}
      />
    </div>
  )
}

export default App
