
// ChooseUserStyles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ChooseUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-top:-10px;
  padding: 0;
  background-color: #EFF4FF;
  text-align: center;
  @media screen and (min-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const UserSection = styled.div`
  text-align: center;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap:-15px;
  margin-bottom:10px;
  justify-content:space-between;
  align-items: center;
  background-color: #EFF4FF;
  @media screen and (min-width: 768px) {
    padding-top: 10px;
    margin: 20px;
  }
`;
export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 200px;
  margin-bottom: 20px;
  color: #2648c3;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;
export const Button = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2563EB;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #1E4BAF;
  }
  @media screen and (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;
export const ChooseGuestContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #EFF4FF;
  padding: 20px;
  @media screen and (min-width: 500px) {
    align-items: flex-start;
  }
`;
export const ProjectContainer = styled.div`
  position: relative;
  width: 50%;
  margin: 0 auto 20px;
  text-align: center;
  background-color: #EFF4FF;
  &:hover .overlay {
    opacity: 1;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.3s ease-out;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease;
    background-color: #008CBA;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .text {
    color: white;
    font-size: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
