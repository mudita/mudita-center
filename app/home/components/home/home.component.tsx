import * as React from "react"
import { useState } from "react"
import styled from "styled-components"

const HomeWrapper = styled.div`
  font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans,
    sans-serif;
  width: 80%;
  margin: auto;
  border: 1px #ccc dotted;
`

const HomeTitle = styled.div`
  padding: 10px;
  margin: 10px 0px;
`

const HomeContent = styled.div`
  padding: 10px;
  margin: 10px 0px;
`

const Home = () => {
  const [inc, setInc] = useState(0)
  const handleTitleClick = () => setInc(inc + 1)
  return (
    <HomeWrapper>
      <HomeTitle onClick={handleTitleClick}> Title {inc} </HomeTitle>
      <HomeContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean orci
        dolor, rutrum at quam sed, aliquet dapibus ante. Maecenas id commodo
        justo. Suspendisse potenti. Pellentesque ut tristique tortor, non
        ultrices ante. Maecenas vel orci arcu. Duis ut nunc blandit, vestibulum
        dui sed, dignissim lorem. Curabitur eleifend nisi faucibus massa
        elementum ultricies. Integer sed quam felis. Aenean tincidunt, velit
        tempus elementum pellentesque, risus erat maximus mi, nec iaculis nisl
        dolor elementum tortor. Nunc sollicitudin sem vitae auctor gravida.
        Vestibulum vel commodo velit. Cras id pellentesque lectus, et viverra
        enim. Ut vel mauris tempor, consequat purus at, fringilla ipsum. Sed
        enim diam, vestibulum vitae dui et, tempor faucibus tortor. Nam eget
        nisi lacinia, condimentum turpis id, iaculis sem. Phasellus porttitor
        elementum elit, egestas pellentesque nulla. Sed aliquet nec lectus non
        sollicitudin. Morbi feugiat sollicitudin ullamcorper. Donec nec congue
        neque, sed volutpat enim.
      </HomeContent>
    </HomeWrapper>
  )
}

export default Home
