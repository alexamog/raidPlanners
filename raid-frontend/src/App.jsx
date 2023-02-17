import { Router, Outlet, ReactLocation } from "@tanstack/react-location";
import { ChakraProvider } from '@chakra-ui/react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CreatePlan from "./components/CreatePlan";
import Landing from "./components/landingPage/Landing";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import ViewCard from "./components/ViewCard";
const location = new ReactLocation();

function App() {

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
            card: //hard coded for now
            {
              id: "uuid23432",
              author: "Bry-guy",
              authorId: "100319324333432832",
              discriminator: "831",
              avatar: "a57b03dcb179eb2ca827f55fbb828b08",
              title: "Raid Event",
              description: "Raid with the boys!",
              datetime: "2023-01-14T15:40",
              location: "432  Street",
              attending: []

            },
          }),
        },
      ],
    },

    {
      path: "create",
      element: <CreatePlan />
    }
  ];

  async function fetchPostById(postId) {
    await new Promise((r) => setTimeout(r, 300));

    return await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((r) => {
        // console.log(r.data)
        r.data
      })
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
