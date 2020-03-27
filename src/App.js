import React from 'react';
import Main from './components/Main.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default App;
