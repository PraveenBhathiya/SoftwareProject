import React from 'react'
import './DashHero.css';
import Title from '../Common/Title/Title';

const DashHero = () => {
  return (
    <>
    <section className="dashhero">
        <div className="container">
            <div className="row">
                <Title Subtitle='WELCOME TO Faculty of Engineering' title='A platform for students to submit projects and for teachers to review and grade them'/>
                <p>Our platform facilitates seamless project submissions for students and provides a structured environment for teachers to review and grade academic work efficiently. Elevate your academic journey with our comprehensive project management system.</p>
                <div className="button">
                    <button className="primary-btn">
                        GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
                    </button>
                    <button >
                        VIEW PROJECT SUMMARY <i className='fa fa-long-arrow-alt-right'></i>
                    </button>
                </div>
            </div>
        </div>
    </section>
    <div className="margin"></div>
    
    </>
  )
}

export default DashHero