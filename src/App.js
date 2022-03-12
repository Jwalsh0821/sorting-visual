import React, { useState } from "react";
import "./App.css";

const numOfElements = 50;
const width = 50 / numOfElements;
const padding = 10 / numOfElements;
const speed = 1;
const getInitialSizes = () => {
  let arr = [];
  for (let i = 0; i < numOfElements; i++) {
    arr.push(Math.floor(Math.random() * 70) + 1);
  }
  return arr;
};
const initialSizes = getInitialSizes();

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function App() {
  const [sizes, setSizes] = useState([...initialSizes]);

  async function quickSort(arr) {
    let n = arr.length;

    for (let i = 0; i < n; i++) {
      // Finding the smallest number in the subarray
      await sleep(speed);
      let min = i;
      for (let j = i + 1; j < n; j++) {
        await sleep(speed);
        if (arr[j] < arr[min]) {
          min = j;
        }
      }
      if (min != i) {
        // Swapping the elements
        let tmp = arr[i];
        arr[i] = arr[min];
        arr[min] = tmp;
        setSizes([...arr]);
      }
    }
    return arr;
  }

  function handleSortClick() {
    quickSort(sizes);
  }
  function handleReset() {
    setSizes(getInitialSizes);
  }
  return (
    <div className="App">
      <div id="itemContainer">
        {sizes.map((size, index) => (
          <span
            id="item"
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
