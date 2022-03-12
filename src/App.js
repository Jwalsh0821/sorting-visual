import React, { useState } from "react";
import "./App.css";

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const initialNumElements = 50;
const initialSpeed = 5;
const maxSpeed = 50;

function App() {
  const [speed, setSpeed] = useState(initialSpeed);
  const [numOfElements, setNumOfElements] = useState(initialNumElements);
  const getInitialSizes = () => {
    let arr = [];
    for (let i = 0; i < numOfElements; i++) {
      arr.push(Math.random() * 60 + 2);
    }
    return arr;
  };
  const initialSizes = getInitialSizes();
  const [sizes, setSizes] = useState([...initialSizes]);
  const width = 50 / numOfElements;
  const padding = 10 / numOfElements;

  async function selectionSort(arr) {
    let n = arr.length;

    for (let i = 0; i < n; i++) {
      // Finding the smallest number in the subarray
      document.getElementById(i.toString()).style.backgroundColor = "green";
      await sleep(speed);
      let min = i;
      for (let j = i + 1; j < n; j++) {
        document.getElementById(j.toString()).style.backgroundColor = "red";
        await sleep(speed);
        if (arr[j] < arr[min]) {
          min = j;
        }
        document.getElementById(j.toString()).style.backgroundColor = "black";
      }
      if (min != i) {
        // Swapping the elements
        let tmp = arr[i];
        arr[i] = arr[min];
        arr[min] = tmp;
        setSizes([...arr]);
      }
      document.getElementById(i.toString()).style.backgroundColor = "black";
    }
    return arr;
  }

  function handleSortClick() {
    selectionSort(sizes);
  }
  function handleReset() {
    setSizes(getInitialSizes());
  }
  function handleNumElemSlider() {
    setNumOfElements(document.getElementById("numElements-slider").value);
    setSizes(getInitialSizes());
  }

  function handleSpeedSlider() {
    setSpeed(maxSpeed - document.getElementById("speed-slider").value);
  }

  return (
    <div className="App">
      <h1>Selection Sort</h1>
      <label htmlFor="numElements-slider">Number of Elements</label>
      <input
        type="range"
        min="10"
        max="100"
        id="numElements-slider"
        onChange={handleNumElemSlider}
      />
      <span id="speed-label">{numOfElements}</span>
      <label htmlFor="speed-slider">Speed</label>
      <input
        type="range"
        min="1"
        max={maxSpeed}
        id="speed-slider"
        onChange={handleSpeedSlider}
      />
      <span id="numElements-label">{maxSpeed - speed}</span>
      <div id="itemContainer">
        {sizes.map((size, index) => (
          <span
            className="item"
            id={index.toString()}
            key={index}
            style={{
              height: size * 10 + "px",
              width: width + "em",
              padding: padding + "em",
            }}
          >
            &nbsp;
          </span>
        ))}
      </div>
      <div id="button-container">
        <span>
          <button id="sort-button" onClick={handleSortClick}>
            Sort!
          </button>
        </span>
        <span>
          <button id="reset-button" onClick={handleReset}>
            Reset
          </button>
        </span>
      </div>
    </div>
  );
}

export default App;
