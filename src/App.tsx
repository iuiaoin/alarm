import React from "react";
import { CountDownTime } from "./constants";
import { Timer } from "./Timer";
import "./App.css";
import Particle from "react-particle-effect-button";

export const App: React.FC = () => {
  const [time, setTime] = React.useState(-1);
  const [hidden, setHidden] = React.useState(true);
  const onClickCrazy = React.useCallback(() => {
    if(time > 0) return;
    setTime(CountDownTime.Crazy);
  }, [time]);
  const onClickCompete = React.useCallback(() => {
    if(time > 0) return;
    setTime(CountDownTime.Compete);
  }, [time]);
  const onClickNormal = React.useCallback(() => {
    if(time > 0) return;
    setTime(CountDownTime.Normal);
  }, [time]);
  const onClickCasual = React.useCallback(() => {
    if(time > 0) return;
    setTime(CountDownTime.Casual);
  }, [time]);
  const onComplete = React.useCallback(() => {
    setHidden(false);
  }, []);

  return <>{hidden ? <div className="root dark">
    <Particle color="#f9f9f9" hidden={time === CountDownTime.Crazy} direction="left" onComplete={onComplete}>
      <button className="button" onClick={onClickCrazy}>疯狗模式</button>
    </Particle>
    <Particle color="#f9f9f9" hidden={time === CountDownTime.Compete} direction="left" onComplete={onComplete}>
      <button className="button" onClick={onClickCompete}>竞技模式</button>
    </Particle>
    <Particle color="#f9f9f9" hidden={time === CountDownTime.Normal} direction="left" onComplete={onComplete}>
      <button className="button" onClick={onClickNormal}>正常模式</button>
    </Particle>
    <Particle color="#f9f9f9" hidden={time === CountDownTime.Casual} direction="left" onComplete={onComplete}>
      <button className="button" onClick={onClickCasual}>休闲模式</button>
    </Particle>
  </div> : <Timer initTime={time} />}</>;
};

export default App;
