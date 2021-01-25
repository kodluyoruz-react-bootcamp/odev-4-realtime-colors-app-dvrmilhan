/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import { useEffect, useState } from 'react';
import { initSocket, disconnectSocket, sendColor, subscribeToColor } from './socketService'
import SketchPicker from "react-color"


function App() {
  //States
  const [color, setColor] = useState("");
  const [colors, setColors] = useState('');

  //useEffect for initialization
  useEffect(() => {
    initSocket();
    getLocalColor();
    subscribeToColor((color => setColor(color)));

    return () => disconnectSocket();
  }, []);

  //Functions
  const getLocalColor = () => {
    if (localStorage.getItem('colors') === null) {
      localStorage.setItem('colors', JSON.stringify(''));
    } else {

      localStorage.getItem('colors', JSON.stringify(colors));
      setColors(colors);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    sendColor(color);
    saveLocalColor(color);
  };

  const saveLocalColor = (clr) => {
    localStorage.setItem('colors', JSON.stringify(clr));
  };




  return (
    <div style={{ backgroundColor: `${color}` }} className="App">
      <div className="Body">
        <SketchPicker
          className="Color"
          color={color}
          onChangeComplete={(color) => setColor(color.hex)} />
        <button onClick={onSubmitHandler}> Change Color</button>
        <p>Your color is : {color}</p>
      </div>
    </div>
  );
}

export default App;
