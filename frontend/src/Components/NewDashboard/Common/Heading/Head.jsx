import React from 'react'
import './Header.css';
import photo from '../../../../Assets/ruhlogo-rm.png';

const Head = () => {
  return (
    <div>
        <section className="head">
            <div className="container FlexSB">
                <div className="logo">
                    <img src={photo} alt="" />
                    <h1>UGP</h1>
                    <span>Management System</span>
                </div>

                <div className="social">
                    <i className='fab fa-facebook-f icon'></i>
                    <i className='fab fa-instagram icon'></i>
                    <i className='fab fa-twitter icon'></i>
                    <i className='fab fa-youtube icon'></i>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Head