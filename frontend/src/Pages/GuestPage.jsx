import React from 'react';
import { Title } from '../Styles/AdminSignInStyles';
import { ChooseGuestContainer, ProjectContainer} from '../Styles/ChooseUserStyles';

//images
import image1 from '../Assets/image1.jpg'
import image2 from '../Assets/image2.jpg'
import image3 from '../Assets/image3.jpg'



const GuestUser = () => {

  return (
    <ChooseGuestContainer>
    <Title>VIEW PAST PROJECTS</Title> <br/>
      <ProjectContainer>
        <img src={image1} alt="Image 1" />
        <div className="overlay">
          <div className="text">Innovation</div>
        </div>
      </ProjectContainer>
      <ProjectContainer>
        <img src={image2} alt="Image 2" />
        <div className="overlay">
          <div className="text">Creativity</div>
        </div>
      </ProjectContainer>
      <ProjectContainer>
        <img src={image3} alt="Image 3" />
        <div className="overlay">
          <div className="text">Mastery</div>
        </div>
      </ProjectContainer>
    </ChooseGuestContainer>
  );
}



export default GuestUser;