import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { io } from "socket.io-client";
import { Route, Routes } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import JoinGroupModal from "./components/JoinGroupModal";
import MessageModal from "./components/MessageModal";

const message = "신청되었습니다."
const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/users/:user_id",
    element: <JoinGroupModal />,
  },
  {
    path: "/message",
    element: <MessageModal message={message}/>
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
