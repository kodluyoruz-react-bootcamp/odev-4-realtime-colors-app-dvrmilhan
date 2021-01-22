
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';


function App() {
  const [color, setColor] = useState("#FFC0CB");

  useEffect(() => {
    const socket = io('http://localhost:3000', {
      transports: ["websocket"]
    })

    socket.emit("new-user", { color })

  }, [color]);



  return (
    <div className="App" style={{
      background: `${color}`,
      height: '757px'

    }}>
      <SketchPicker

        color={color}
        onChangeComplete={(color) => setColor(color.hex)}
      />
    </div>
  );
}

export default App;
