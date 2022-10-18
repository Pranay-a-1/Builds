import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './component-styles/Nav.css';

function Nav() {
    const [show, handleShow] = useState(false);
    const history = useHistory();


    
    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar)
        
        return () => window.removeEventListener("scroll", transitionNavBar)

    }, [])
    

  return (
      <div className={`nav ${show && "nav__black"}`}>
          <div className='nav__contents'>
              <img
              className="nav__logo"
              src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="netflix-logo" />
          
              <img
                onClick = {() => history.push("/profile")}
                className="nav__avatar"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png" alt="profile-avatar" />
          </div>
        
    </div>
  )
}

export default Nav