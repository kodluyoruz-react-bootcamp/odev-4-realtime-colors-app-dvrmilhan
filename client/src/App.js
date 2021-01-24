

import { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { initSocket, disconnectSocket, sendColor, subscribeToColor, subscribeInitialColor } from './socketService'


function App() {
  const [color, setColor] = useState("#FFC0CB");


  useEffect(() => {
    initSocket();

    subscribeInitialColor((data) => {
      console.log("color from backend", data);
      setColor(data);
    });

    subscribeToColor((color) => {
      setColor(color);
    });

    return () => disconnectSocket();
  }, []);

  const onClickHandler = (e) => {
    e.preventDefault();
    sendColor(color);
  };


  return (
    <div style={{
      background: `${color}`,
      height: '757px'

    }}>
      <div className="App" >
        <SketchPicker
          className="Color"
          color={color}
          onChangeComplete={(color) => setColor(color.hex)}
        />
      </div>
      <button onClick={onClickHandler}> Change Color</button>
      <p>Your color is : {color}</p>
    </div>
  );
}

export default App;
