import React from "react";
import { CountDownTime } from "./constants";
import { Timer } from "./Timer";
import "./App.css";
import Particle from "react-particle-effect-button";

export const App: React.FC = () => {
  const [time, setTime] = React.useState(-1);
  const [hidden, setHidden] = React.useState(true);
  const ref = React.useRef<HTMLAudioElement>(null);
  const [ready, setReady] = React.useState(false);
  const [complete, setComplete] = React.useState(false);

  const onClickCrazy = React.useCallback(() => {
    if(time > 0) return;
    ref.current?.load();
    setTime(CountDownTime.Crazy);
  }, [time]);
  const onClickCompete = React.useCallback(() => {
    if(time > 0) return;
    ref.current?.load();
    setTime(CountDownTime.Compete);
  }, [time]);
  const onClickNormal = React.useCallback(() => {
    if(time > 0) return;
    ref.current?.load();
    setTime(CountDownTime.Normal);
  }, [time]);
  const onClickCasual = React.useCallback(() => {
    if(time > 0) return;
    ref.current?.load();
    setTime(CountDownTime.Casual);
  }, [time]);

  const onComplete = React.useCallback(() => {
    setComplete(true)
  }, []);

  const onCanPlayThrough = React.useCallback(() => {
    setReady(true);
  }, []);

  React.useEffect(() => {
    if(ready && complete) {
      setHidden(false);
    }
  }, [ready, complete]);

  return <>{hidden ? <div className="root">
    <Particle color="#EFEFEF" hidden={time === CountDownTime.Crazy} direction="left" onComplete={onComplete}>
      <button className="button" onClick={onClickCrazy}>疯狗模式</button>
    </Particle>
    <Particle color="#EFEFEF" hidden={time === CountDownTime.Compete} direction="left" onComplete={onComplete}>
      <button className="button" onClick={onClickCompete}>竞技模式</button>
    </Particle>
    <Particle color="#EFEFEF" hidden={time === CountDownTime.Normal} direction="left" onComplete={onComplete}>
      <button className="button" onClick={onClickNormal}>正常模式</button>
    </Particle>
    <Particle color="#EFEFEF" hidden={time === CountDownTime.Casual} direction="left" onComplete={onComplete}>
      <button className="button" onClick={onClickCasual}>休闲模式</button>
    </Particle>
  </div> : <Timer initTime={time} startRef={ref} />}
  <audio
      ref={ref}
      className="audio"
      preload="metadata"
      controls
      src="/audio/start.mp3"
      playsInline
      autoPlay={false}
      onCanPlayThrough={onCanPlayThrough}
    />
  </>;
};

export default App;
