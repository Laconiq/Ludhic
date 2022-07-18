import React, { Component } from 'react'
import './nav.css'
import {AiOutlineHome} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import {BiBook} from 'react-icons/bi'
import {BiMessageSquareDetail} from 'react-icons/bi'
import {AiOutlineBulb} from 'react-icons/ai'
import {useState} from 'react'
import {RiGamepadLine} from 'react-icons/ri'

{/*function Nav() {
  const [activeNav, setActiveNav] = useState('/')
  return (
    <nav>
      <a href="/" onClick={() => setActiveNav('/')} className={activeNav === '/' ? 'active' : ''}><AiOutlineHome/></a>
      <a href="/jeux" onClick={() => setActiveNav('/jeux')} className={activeNav === '/jeux' ? 'active' : ''}><AiOutlineUser/></a>
      <a href="#experience" onClick={() => setActiveNav('#experience')} className={activeNav === '#experience' ? 'active' : ''}><BiBook/></a>
      <a href="#portfolio" onClick={() => setActiveNav('#portfolio')} className={activeNav === '#portfolio' ? 'active' : ''}><AiOutlineBulb/></a>
      <a href="#contact" onClick={() => setActiveNav('#contact')} className={activeNav === '#contact' ? 'active' : ''}><BiMessageSquareDetail/></a>
    </nav>
  )
}

export default Nav

*/}

export default class NavBar extends Component {
  
  render() {
    return (
      <nav>
        <a href="/"><AiOutlineHome/></a>
        <a href="/jeux"><RiGamepadLine/></a>
      </nav>
    )
  }
}