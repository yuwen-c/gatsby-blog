import React from 'react'
import {Link} from 'gatsby'
import styled from "styled-components";
import './footer.css'

const MyLink = styled.a`
  color: #8FB9A8;
  padding-right: 1rem;
`

const Footer = () => {
    return (
        <footer className="h2 mt5 f5 b">
            <MyLink href="https://github.com/yuwen-c" target="_blank">Github</MyLink>
            
            <MyLink href="mailto:yuwen.azulejos@gmail.com">Email</MyLink>
        </footer>
    )
}

export default Footer;