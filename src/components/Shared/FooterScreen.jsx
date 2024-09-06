import React from 'react'
import './styles/FooterScreen.css'

const FooterScreen = () => {
  return (
    <footer className="footer">
    <div className="container">
        <div className="row">
            <div className="footer-col">
                <h4>company</h4>
                <ul>
                    <li><a href="#">about us</a></li>
                    <li><a href="#">our services</a></li>
                    <li><a href="#">privacy policy</a></li>
                    <li><a href="#">affiliate program</a></li>
                </ul>
            </div>
            <div className="footer-col">
                <h4>get help</h4>
                <ul>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">shipping</a></li>
                    <li><a href="#">returns</a></li>
                    <li><a href="#">order status</a></li>
                    <li><a href="#">payment options</a></li>
                </ul>
            </div>
            <div className="footer-col">
                <h4>online shop</h4>
                <ul>
                    <li><a href="#">Smart TV</a></li>
                    <li><a href="#">Computers</a></li>
                    <li><a href="#">Smartphones</a></li>
                </ul>
            </div>
            <div className="footer-col">
                <h4>follow us</h4>
                <div className="social-links">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>
        <div className='footer-text'>
            <p>all rights reserved </p>
            <p>developed and designed by eduardo-dev</p>
        </div>
    </div>
    </footer>
  )
}

export default FooterScreen