import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { io } from "socket.io-client";
import { Route, Routes } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Layout from "./pages/Layout";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/users",
    element: <Layout />,
  },
]);

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

  return <RouterProvider router={router} />;
}

export default App;
