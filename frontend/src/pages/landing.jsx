import React from 'react'
import "../App.css"
import { Link } from "react-router-dom";


export default function LandingPage() {
  return (
    <div className='landingPageContainer'>

  <nav>


  <div className="navHeader">
    <h2>GEN-Z Meet</h2>
  </div>
  <div className="navlist">
   <p>Join as Guest </p>
   <p>Register</p>
   <button>Login</button>
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

