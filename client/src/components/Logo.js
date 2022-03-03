import React from 'react'
import styled from 'styled-components'

import logo from '../logo.svg'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``
function Logo(props){
    return (
        <Wrapper href="https://www.centennialcollege.ca/">
            <img src={logo} width="50" height="50" alt="centennialcollege.ca" />
        </Wrapper>
    );
}

export default Logo
