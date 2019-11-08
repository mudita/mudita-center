import * as React from "react"
import { useState } from "react"
import HomeView from "./home-view.component"

const Home = () => {
  const [inc, setInc] = useState(0)
  const handleTitleClick = () => setInc(inc + 1)
  return <HomeView onTitleClick={handleTitleClick} count={inc} />
}

export default Home
