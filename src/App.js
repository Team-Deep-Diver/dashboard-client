import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/guest",
    element: <Layout />,
  },
  {
    path: "/users/:user_id",
    element: <Layout />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
