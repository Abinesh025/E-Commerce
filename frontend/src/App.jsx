  import react, { Fragment } from "react"
import Navbar from "./Components/Layouts/Navbar"
import Footer from "./Components/Layouts/Footer"
import Home from "./Components/Home"

  const App = ()=>{
      return(
      <Fragment >
          <Navbar />
          <Home />
          <Footer />
      </Fragment>  
      )
  }

export default App