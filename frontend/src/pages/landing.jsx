import React from 'react'
import "../App.css"
import { Link ,useNavigate } from "react-router-dom";


export default function LandingPage() {
    const router = useNavigate();

  return (
    <div className='landingPageContainer'>

  <nav>

  <div className="navHeader">
    <h2>GEN-Z Meet</h2>
  </div>
  <div className="navlist">
   <p className="nav-link" onClick={() => {
                        router("/guest")
                    }}>Join as Guest</p>
                    <p className="nav-link" onClick={() => {
                        router("/auth")

                    }}>Register</p>
   <div className="nav-btn" onClick={() => {
                        router("/auth")

                    }}>Login</div>
  </div>
    </nav>
    
        <div className="landingMainContainer">
<div><h1><span className="hero-highlight">Connect</span> with your Loved Ones</h1>
<p>Bridge the distance with crystal-clear video calls. GEN-Z Meet brings you closer to the people who matter most.</p>
<div className='hero-cta'>
   <Link to={"/auth"}>Get Started</Link> 
</div>
</div>
<div>
    <img src="/mobile.png" alt="GEN-Z Meet mobile app preview" />
</div>

        </div>


    </div>
  )
}
