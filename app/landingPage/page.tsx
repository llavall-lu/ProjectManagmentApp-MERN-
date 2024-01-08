"use client";
import React from "react";
import styled from "styled-components";
import Navbar from "../Components/Nav/Nav";
import { useGlobalState } from "../context/GlobalContextProvider";

const HomePage = () => {
  const { theme } = useGlobalState();
  return (
    <Container theme={theme}>
      <Box theme={theme}>
        <Navbar />
        <Title>Welcome to Project Manager</Title>
        <Title>For all your project management needs</Title>
        <Description>
          Welcome to my free project management website that can be used with a
          simple sign up
        </Description>
      </Box>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  background: ${({ theme }) =>
    `linear-gradient(45deg, ${theme.calendarBg2} 20%, ${theme.colorPurple} 90%)`};
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 40%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colorBg2};
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colorWhite};
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colorWhite};
  font-size: 16px;
  text-align: center;
`;

export default HomePage;
