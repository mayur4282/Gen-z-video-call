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
   <p onClick={() => {
                        router("/guest")
                    }}>Join as Guest</p>
                    <p onClick={() => {
                        router("/auth")

                    }}>Register</p>
                    <div onClick={() => {
                        router("/auth")

                    }} role='button'></div>
   <div onClick={() => {
                        router("/auth")

                    }} role='button'>Login</div>
  </div>
    </nav>
    
        <div className="landingMainContainer">
<div><h1><span style={{color: "orange"}}>Connect</span> with your Loved once </h1>
<p>Cover a distance by GEN-Z Meet</p>
<div role='button'>
   <Link to={"/auth"}>Get Started</Link> 
</div>
</div>
<div>
    <img src="/mobile.png" alt="mobile" />
</div>

        </div>


    </div>
  )
}

