"use client";
import React, { useCallback } from 'react'
import { SignIn } from '@clerk/nextjs';
import styled from 'styled-components';
import { useRouter } from 'next/navigation'; 

//styled component for the sign-in container
const Styledsignin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative; 

  .cl-internal-b3fm6y {
    display: none;
  }
`;

//styled component for the button
const StyledButton = styled.button`
  position: absolute;
  top: 70px;
  left: 10px;
  background-color: #6f48eb33;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;

  border-radius: 5px;
  transition: box-shadow 0.3s ease; 

  box-shadow: 0 0 10px #7c41ff, 0 0 20px #7c41ff, 0 0 30px #7c41ff, 0 0 40px #7c41ff;

  &:hover {
    box-shadow: 0 0 15px #7c41ff, 0 0 25px #7c41ff, 0 0 35px #7c41ff, 0 0 45px #7c41ff;
  }
`;

function Page() {
  const router = useRouter(); 

  //callback function to navigate to the landing page
  const goToLandingPage = useCallback(() => {
    router.replace('/landingPage'); 
  }, [router]);

  return (
    <Styledsignin>
        <StyledButton onClick={goToLandingPage}>Go to Landing Page</StyledButton> {/* Use StyledButton */}
        <SignIn/> {/* Render the SignIn component */}
    </Styledsignin>
  )
}

export default Page;