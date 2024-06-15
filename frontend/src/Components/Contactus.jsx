import React from 'react'
import '../CSS/Contactus.css';

const Contactus = () => {
  return (
    <div className='contact'>
        <div className="postal">
            <h2>Postal Address</h2>
            <p>
            Department of Electrical and Information Engineering,<br/>
            Faculty of Engineering,<br/>
            University of Ruhuna,<br/>
            Hapugala,<br/>
            Galle  80000,<br/>
            Sri Lanka.<br/>
            </p>
        </div>
        <div className="email">
            <h2>E-mail</h2>
            <a href="head@eie.ruh.ac.lk">head@eie.ruh.ac.lk</a>
        </div>
        <div className="phone">
            <h2>Phone Numbers</h2>
            <p>+(94) 912245766,<br/> +(94) 912245767, <br/>+(94) 913924732,</p>
        </div>
        <div className="fax">
            <h2>Fax</h2>
            <p>+94 912245762</p>
        </div>
    </div>
  )
}

export default Contactus;