import React, { PropsWithChildren } from "react";
import "./Popup.scss";

interface IProps {
  setWon: React.Dispatch<React.SetStateAction<boolean>>;
}

const Popup = ({ setWon }: PropsWithChildren<IProps>) => {
  const clickHandler = () => {
    setWon(false);
  };

  return (
    <div className="banner-wrapper">
      <div className="won-banner">
        <span className="title">YOU WON</span>
        <span className="question">Want to play again?</span>
        <div className="play" onClick={() => clickHandler()}>
          PLAY AGAIN
        </div>
      </div>
    </div>
  );
};

export default Popup;
