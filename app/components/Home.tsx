import * as React from "react";
import styled from 'styled-components'

interface HomeProps {
    className?: string;
}

const Component = styled.div`
  color: red;
`;

class Home extends React.Component<HomeProps, {}> {
    render() {
        return <div className={this.props.className}> Home start</div>;
    }
}

const StyledHome = styled(Home)`
  color: #fff;
  font: 400 36px/1.4 "cardo";
  margin: 20px 0;
  text-align: left;
  text-indent: -0px;
`;

export default StyledHome;