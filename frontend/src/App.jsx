  import react, { Fragment } from "react"
import Navbar from "./Components/Layouts/Navbar"
import Footer from "./Components/Layouts/Footer"
import Home from "./Components/Home"

  const App = ()=>{
      return(
        <div className="w-full">
                 <Navbar />
          <Home />
          <Footer />
        </div>  
      )
  }

export default App