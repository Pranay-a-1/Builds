import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice.js';
import {useDispatch, useSelector} from 'react-redux';
import ProfileScreen from './components/ProfileScreen';



function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        //loggedin
        dispatch(login({
          uid: userAuth.uid,
          email:userAuth.email,
        }))       
      } else {
        //logged out
        dispatch(logout)
      }
    });


    return unsubscribe;
  
    
  }, [])
  

  return (
    <div className="App">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
            <Switch>
              <Route path='/profile'>
                <ProfileScreen />
              </Route>
          <Route exact path="/">
            <HomeScreen />
          </Route>
        </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
