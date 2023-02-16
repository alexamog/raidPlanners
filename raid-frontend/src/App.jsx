import { Router, Outlet, ReactLocation } from "@tanstack/react-location";
import { ChakraProvider } from '@chakra-ui/react'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CreatePlan from "./components/CreatePlan";
import Landing from "./components/landingPage/Landing";
import Test from "./components/Test";

const location = new ReactLocation();

function App() {

  const routes = [
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "hangouts",
      element: <Dashboard />,
    },
    {
      path: "create",
      element: <CreatePlan />
    },
    {
      path: "loginMockup",
      element: <Test />
    }
  ];

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
