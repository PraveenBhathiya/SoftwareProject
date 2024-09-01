import React from 'react'
import head from '../Assets/dephead.png';
import '../CSS/Aboutus.css';

const Aboutus = () => {
  return (
    <div className='about-us'>
        <div className="imgtag">
            <img src={head} alt="" /><br/>
            <p>
                Rajitha Udawalpola <br/>
                Head, Senior Lecturer <br/>
                PhD(Uppsala, Sweden), BScEng (Hons) (Peradeniya)<br/>
                <a href="&">View detalis</a>
            </p>

        </div>
        <div className="para">
        Welcome to the Webpage of the Department of the Electrical and Information Engineering, Faculty of Engineering, University of Ruhuna. We are located at Hapugala nearby the beautiful coastal city, Galle, in the Southern province of Sri Lanka. 
        Our department is one of the pioneering departments of the Faculty of Engineering commenced in the Year 2000.

From its inception in the Year 2000, the Department of Electrical and Information Engineering has become a regional plus national hub for innovation, research excellence, and community services in the country. The Department has already produced 850 graduates and these graduates hold key positions in both Industry and Academia, not only in Sri Lanka even in many other countries of the globe.

The Department Electrical and Information Engineering prioritizes teaching activities students through a fully accredited degree program. The undergraduate students in the department have access to a wide range of course modules in Electric Power Engineering, Electronics Engineering, Telecommunication Engineering and Software Engineering. The department has fully equipped laboratory facilities in areas such as Electric Machines, Power Systems and High Voltage Engineering, Renewable Energy, Electronics, Communication Systems, Robotics, and Control Systems so that students acquire sufficient hands on experience required to be competitive in their fields of expertise.

In addition, as a department, we always push beyond the boundaries of knowledge and practice in Engineering through various research activities thus often has received national and international recognition. Currently, the department engages formal courses that lead to M.Phil degrees in Electrical and Information Engineering. The Master Program for Telecommunication and Information Engineering will be commenced soon.

We have already introduced a new field of specialization program, B.Sc. (Eng.) in Computer Engineering with 2019/2020 A/L student intake. Consequently, a 7-story building with modern laboratory facilities will be constructed soon aligning with the new addition. This will create more openings to cater to stimulating demands in the fields of Computer and Software Engineering.

If you have any comments and queries, please contact us so that we will be returned you at our earliest convenience.
        </div>
    </div>
  )
}

export default Aboutus;