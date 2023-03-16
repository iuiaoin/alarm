import React from "react";
import { CountDownTime } from "./constants";
import { Timer } from "./Timer";
import "./App.css";

export const App: React.FC = () => {
  const [time, setTime] = React.useState(CountDownTime.Compete);
  const [hidden, setHidden] = React.useState(true);
  const onClickCrazy = React.useCallback(() => {
    setTime(CountDownTime.Crazy);
    setHidden(false);
  }, []);
  const onClickCompete = React.useCallback(() => {
    setTime(CountDownTime.Compete);
    setHidden(false);
  }, []);
  const onClickNormal = React.useCallback(() => {
    setTime(CountDownTime.Normal);
    setHidden(false);
  }, []);
  const onClickCasual = React.useCallback(() => {
    setTime(CountDownTime.Casual);
    setHidden(false);
  }, []);
  return <>{hidden ? <div className="root dark">
    <button className="button" onClick={onClickCrazy}>疯狗模式</button>
    <button className="button" onClick={onClickCompete}>竞技模式</button>
    <button className="button" onClick={onClickNormal}>正常模式</button>
    <button className="button" onClick={onClickCasual}>休闲模式</button>
  </div> : <Timer initTime={time} />}</>;
};

export default App;
