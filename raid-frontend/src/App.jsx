import { ChakraProvider } from '@chakra-ui/react'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {

  return (
    <ChakraProvider>
      <Navbar />
      <Dashboard />
      <Footer />
    </ChakraProvider>
  )
}

export default App
