import React, { Component } from 'react'
import './nav.css'
import {AiOutlineHome} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import {RiGamepadLine} from 'react-icons/ri'
import {BsGear} from 'react-icons/bs'
import {AiOutlineCalendar} from 'react-icons/ai'
import {ImLab} from 'react-icons/im'
import {useState} from 'react'


{/*

function Nav() {
  const [activeNav, setActiveNav] = useState('/')
  return (
    <nav>
      <a href="/" onClick={() => setActiveNav('/')} className={activeNav === '/' ? 'active' : ''}><AiOutlineHome/></a>
      <a href="/jeux" onClick={() => setActiveNav('/jeux')} className={activeNav === '/jeux' ? 'active' : ''}><AiOutlineUser/></a>
      <a href="/calendrier" onClick={() => setActiveNav('/calendrier')} className={activeNav === '/calendrier' ? 'active' : ''}><BsCalendar/></a>
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
        <a href="/connexion"><AiOutlineUser/></a>
        <a href="/administration"><BsGear/></a>
        {
          /* 
            <a href="/calendrier"><AiOutlineCalendar/></a>
            <a href="/creative-lab"><ImLab/></a>
          */
        }
      </nav>
    )
  }
}

