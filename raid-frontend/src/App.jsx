import { Router, Outlet, ReactLocation } from "@tanstack/react-location";
import { ChakraProvider } from '@chakra-ui/react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CreatePlan from "./components/CreatePlan";
import Landing from "./components/landingPage/Landing";
import { useDB } from "./components/mockupDB";
import Dashboard from "./components/Dashboard";
import ViewCard from "./components/ViewCard";
import axios from "axios";
import Test from "./components/Test";
import { useState } from "react";
const location = new ReactLocation();

function App() {
  const [data, setData] = useState({

  })
  const mockUpDB = useDB((state) => state.mockUpDB);
  const routes = [
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "hangouts",
      element: <Dashboard />
    },
    {
      path: 'event',
      children: [
        {
          path: ':cardId',
          element: <ViewCard />,
          loader: async ({ params: { cardId } }) => ({
            card: await fetchCardById(cardId)
          }),
        },
      ],
    },

    {
      path: "create",
      element: <CreatePlan />
    }
  ];

  async function fetchCardById(postId) {
    await new Promise((r) => setTimeout(r, 300));

    return await axios
      .get(`http://localhost:3001/db/mock/${postId}`)
      .then((r) => r.data);
  }
  return (
    <ChakraProvider>
      <Router routes={routes} location={location}>
        <Navbar />
        <Outlet />
        <Footer />
      </Router>
    </ChakraProvider>
  )
}

export default App
