import React from 'react';
import Main from './components/Main.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <Router>

    <div className="wrapper">
      <Header/>
      <Switch>
        <Route path='*'>
          <Main test={`https://emoji-api.com/emojis?access_key=${'5e5972b95944d2d54c5f6ed9aa6c4554ed12421a'}`}/>
        </Route>
      </Switch>
      <Footer/>
    </div>
    </Router>
  )
}




export default App;
