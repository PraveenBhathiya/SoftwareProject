import { useEffect, useState } from "react";
import Background from "./Background/Background.jsx";
import Navbar1 from "./Navbar/Navbar.jsx";
import Hero from "./Hero/Hero.jsx";


const Home = () => {

let heroData = [
  {text1:"Welcome To",text2:"Faculty of Engineering"},
  {text1:"University of Ruhuna",text2:"Department of Electrical and Information Engineering"},
  {text1:"Seamless task tracking for ",text2:"students and mentors."},
  {text1:"Effortlessly manage",text2:" deadlines and milestones."},
  {text1:"Streamlined project completion",text2:" through efficient collaboration."},
]

const [heroCount,setHeroCount] = useState(0);
const [playStatus,setPlayStatus] = useState(false);

useEffect(()=>{
  setInterval(()=>{
      setHeroCount((count)=>{return count===4?0:count+1})
  },5000)
},[])

  return (
<<<<<<< HEAD
    <div className='home-content'>
        <div className="sidebar">
          <img src={rulogo} alt="Logo" class="logo"/>
              <ul className="nav-links">
                  <li><a href="#">Home</a></li>
                  <li><a href="/about-us">About us</a></li>
                  <li><a href="/contact-us">Contact us</a></li>
               </ul>
        </div>


         <Navbar>
            <ButtonsContainer>
              <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
              <GuestButton onClick={handleGuestClick}>Guest Mode </GuestButton>
            </ButtonsContainer>
         </Navbar>
         <HomeContainer>
             <UniInfo>
              <Title>Welcome to DEIE UGP Management System</Title>
              <Logo1 src= {dep} alt=''/><br/>
              
              
             </UniInfo>
         </HomeContainer>
=======
    <div>
        <Background playStatus={playStatus} heroCount={heroCount}/>
        <Navbar1/>
        <Hero
          setPlayStatus={setPlayStatus}
          heroData={heroData[heroCount]}
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          playStatus={playStatus}
        
        />
>>>>>>> 5832fcbc535b67ed0a90b2c967e6bdea71ca21b2

    </div>
  )
}

export default Home;