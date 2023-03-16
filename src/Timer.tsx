import React from 'react'
import './Timer.css'

interface IProps {
  initTime: number;
  startRef: React.RefObject<HTMLAudioElement>
}

export const Timer: React.FC<IProps> = ({ initTime, startRef }) => {
  const [time, setTime] = React.useState(initTime);
  const [value, setValue] = React.useState(0); 
  const timer = React.useRef<number>();
  const ref = React.useRef<HTMLAudioElement>(null);
  const isLight = React.useMemo(() => {
    return time <= 5 && (time % 2 === 1); 
  }, [time]);

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

  const onClick: React.MouseEventHandler<HTMLElement> = React.useCallback(() => {
    if(startRef.current) {
      startRef.current.currentTime = 0;
    }
    startRef.current?.play();
    if(value === 0) {
      setTime(t => t - 1);
      /** 
       * In Safari on iOS (for all devices, including iPad), preload and autoplay are disabled. 
       * This means the JavaScript play() and load() methods are also inactive until the user initiates playback.
       * Unless the play() or load() method is triggered by user action.
       */ 
      ref.current?.load();
      setValue(v => v + 1);
    } else {
      window.clearInterval(timer.current);
      setTime(initTime);
      ref.current?.pause();
      if(ref.current) {
        ref.current.currentTime = 0;
      }
      setValue(v => v + 1);
    }
  }, [value])

  const onReset: React.MouseEventHandler<HTMLElement> = React.useCallback((e) => {
    e.stopPropagation();
    window.clearInterval(timer.current);
    setTime(initTime);
    setValue(0);
    ref.current?.pause();
    if(ref.current) {
      ref.current.currentTime = 0;
    }
  }, []);

  return (
    <div className={`main ${isLight ? "light" : "dark"}`} onClick={onClick}>
      <div className="time">{time}</div>
      <button className="reset" onClick={onReset}>Reset</button>
      <audio
        ref={ref}
        className="audio"
        preload="metadata"
        controls
        src="/audio/alarm.mp3"
        playsInline
        autoPlay={false}
      />
    </div>
  )
}
