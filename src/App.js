import { useState, useEffect } from "react";
import { io } from "socket.io-client";

import Welcome from "./pages/Welcome";
import Layout from "./pages/Layout";

function App() {
  // const [socket, setSocket] = useState();
  // useEffect(() => {
  //   const socketIO = io.connect(`${process.env.SOCKET_SERVER_HOST}`);
  //   setSocket(socketIO);

  //   return () => {
  //     socketIO.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (socket == null) {
  //     return;
  //   }

  //   socket.once("load-notices", () => {});

  //   socket.emit("get-notices");
  // }, []);

  // useEffect(() => {
  //   if (socket == null) {
  //     return;
  //   }

  //   const interval = setInterval(() => {
  //     socket.emit("save-notices");
  //   }, 20000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <>
      <Layout />
    </>
  );
}

export default App;
