import Header from './components/Navbar/Header'

import Signup from './components/auth/Signup'
import { Route,Routes } from 'react-router-dom'
import Hero from './components/sections/Herro'
import Section1 from './components/sections/Section1'
import Section2 from './components/sections/Section2'
import Footer from './components/sections/Footer'
import Section3 from './components/sections/Section3'
import Dashboard from './components/Home/Dashboard'
import Login from './components/auth/Login'


function App() {

  return (
    <>
    
      
      <Routes>
       <Route path='/' element={
        <>
          <Header/>
          <Hero/>
          <Section1/>
          <Section2/>
          <Section3/>
          <Footer/>
        </>
       }/> 
        <Route path='/login' element={<>
            <Header/>
            <Login/>
            <Footer/>
        </> }/>
        <Route path='/register' element={ <>
            <Header/>
            <Signup/>
            <Footer/>
        </>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      
      
    </>
  )
}

export default App
