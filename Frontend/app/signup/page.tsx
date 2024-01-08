"use client";
import React from "react";
import { SignUp } from "@clerk/nextjs";
import styled from "styled-components";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();

  const goToLandingPage = () => {
    router.push("/landingPage");
  };

  return (
    <Styledsignup>
      <StyledButton onClick={goToLandingPage}>Go to Landing Page</StyledButton>{" "}
      {/* Use StyledButton */}
      <SignUp />
    </Styledsignup>
  );
}

const Styledsignup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative; // Add this to position the button

  .cl-internal-b3fm6y {
    display: none;
  }
`;
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

  box-shadow: 0 0 10px #7c41ff, 0 0 20px #7c41ff, 0 0 30px #7c41ff,
    0 0 40px #7c41ff;

  &:hover {
    box-shadow: 0 0 15px #7c41ff, 0 0 25px #7c41ff, 0 0 35px #7c41ff,
      0 0 45px #7c41ff;
  }
`;

export default page;
