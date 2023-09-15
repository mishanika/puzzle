import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import Popup from "./components/Popup";

type shuffleType = {
  0?: {
    id: number;
    x: number;
    y: number;
  };
  1?: {
    id: number;
    x: number;
    y: number;
  };
};

const App = () => {
  const puzzleRef = useRef<HTMLDivElement>(null);
  const [puzzels, setPuzzles] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5));
  const [shuffled, setShuffled] = useState<shuffleType>({});
  const [selected, setSelected] = useState(-1);
  const [won, setWon] = useState(false);

  const selectItem = (id: number) => {
    setSelected(id);
  };

  // const click = () => {
  //   let shuffleObjects: shuffleType = {};

  //   return
  const handleClick = (id: number) => {
    if (puzzleRef.current != null) {
      //let puzzleNode = puzzleRef.current.children as HTMLCollectionOf<HTMLElement>;
      let { x, y } = puzzleRef.current.children[id].getBoundingClientRect();

      puzzleRef.current.children[id].classList.toggle("selected");

      if (selected !== id) {
        if (shuffled[0]) {
          shuffled[1] = {
            id: id,
            x: x,
            y: y,
          };
        } else {
          shuffled[0] = {
            id: id,
            x: x,
            y: y,
          };
        }
        //const index = shuffled[0] ? 1 : 0
        setShuffled((prev) => ({ ...prev }));
        //selectItem(-1);
      }
    }
  };

  useEffect(() => {
    if (shuffled[0] && shuffled[1]) {
      let puzzleNode = puzzleRef.current!.children as HTMLCollectionOf<HTMLElement>;
      Array.from(puzzleRef.current!.children).forEach((item) => item.classList.add("no-animation"));
      puzzleNode[shuffled[0].id].style.transform = `translate(${shuffled[1].x - shuffled[0].x}px, ${
        shuffled[1].y - shuffled[0].y
      }px)`;
      puzzleNode[shuffled[1].id].style.transform = `translate(${shuffled[0].x - shuffled[1].x}px, ${
        shuffled[0].y - shuffled[1].y
      }px)`;

      let tempArr = [...puzzels];
      let tempElem;
      tempElem = tempArr[shuffled[0].id];
      tempArr[shuffled[0].id] = tempArr[shuffled[1].id];
      tempArr[shuffled[1].id] = tempElem;
      Array.from(puzzleRef.current!.children).forEach((item) => item.classList.remove("selected"));

      delete shuffled[0];
      delete shuffled[1];

      setTimeout(() => {
        Array.from(puzzleRef.current!.children).forEach((item) => item.classList.remove("no-animation"));
        //setPuzzles([...tempArr]);
      }, 2000);
    }
  }, [shuffled]);

  useEffect(() => {
    if (!won) {
      setPuzzles((prev) => [...prev].sort(() => Math.random() - 0.5));
      selectItem(-1);
    }
  }, [won]);

  useEffect(() => {
    let puzzleNode = puzzleRef.current!.children as HTMLCollectionOf<HTMLElement>;
    //Array.from(puzzleRef.current!.children).forEach((item) => item.classList.add("no-transition"));
    Array.from(puzzleNode).forEach((item) => (item.style.transform = `translate(0, 0)`));
    //Array.from(puzzleRef.current!.children).forEach((item) => item.classList.remove("no-transition"));
    if (
      puzzels.every((item, id) => {
        if (id === puzzels.length - 1) {
          return true;
        }
        return item < puzzels[id + 1];
      })
    ) {
      setWon(true);
    }
  }, [puzzels]);

  const puzzleRender = (item: number, id: number) => (
    <div className="puzzle-item" onClick={() => handleClick(id)}>
      {item}
    </div>
  );

  return (
    <div className="App">
      {won ? <Popup setWon={setWon} /> : false}
      <div className="puzzles-container" ref={puzzleRef}>
        {puzzels.map(puzzleRender)}
      </div>
    </div>
  );
};

export default App;
