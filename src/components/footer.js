import React from 'react'
import {Link} from 'gatsby'
import './footer.css'

const Footer = () => {
    return (
        <footer className="h2 mt5">
            <span>
                <a href="https://github.com/yuwen-c">github</a>
            </span>
            。
            <span>
            <a href="mailto:yuwen.azulejos@gmail.com">email</a>
            </span>       
        </footer>
    )
}

export default Footer;