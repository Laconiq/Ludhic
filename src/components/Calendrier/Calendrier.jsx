import React from 'react'
import './calendrier.css'

function Calendrier() {
  return (
    <>
    <div className='calendar-majic'>
      <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=UTC&src=bXRwcmhsYzg0MGFoZTYwZXFwbG5vYjQ1dThAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237CB342" border="solid 1px #777" frameborder="0" scrolling="no"></iframe>
    </div>
    </>
  )
}

export default Calendrier