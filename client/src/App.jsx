import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Homepage from "./pages/Homepage/Homepage";
import Errorpage from "./pages/Errorpage/Errorpage";
import Pokemon from "./pages/Pokemon/Pokemon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "pokemon",
        element: <Pokemon />,
      },
      /*
      {
        path: "pokemon/:id",
        element: <IndividualPokemon />,
      },*/
    ],
    errorElement: <Errorpage />,
  },
]);

// App component to provide the router
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
