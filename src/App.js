// App.js
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import News from './components/News';
import Events from './components/Events';
import Gallery from './components/Gallery';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <AboutUs />
      <News />
      <Events />
      <Gallery />
      <ContactUs />
      <Footer />

      
    </div>
  );
}

export default App;