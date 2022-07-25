import React, { Component } from 'react'
import './nav.css'
import {AiOutlineHome} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import {RiGamepadLine} from 'react-icons/ri'
import {BsCalendar} from 'react-icons/bs'
import {BsPerson} from 'react-icons/bs'
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
        <a href="/calendrier"><BsCalendar/></a>
        <a href="/login"><BsPerson/></a>
      </nav>
    )
  }
}

