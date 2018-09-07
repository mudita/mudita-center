import {remote} from 'electron'
import * as React from "react"
import styled from 'styled-components'

const mainProcessRef = remote.require('./main')

interface HomeProps {
    link?: string
}

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`

// const List = styled.div`
//
// `

class Home extends React.Component<HomeProps, {}> {

    async componentDidMount(){
        const files = await mainProcessRef.listFiles()
        console.log(files);
    }

    render() {
        return (
            <Input
                placeholder="Hover here..."
            />
        )
    }
}

export default Home