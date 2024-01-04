"use client";
import styled from 'styled-components';
import React from 'react'

interface Props {
    children: React.ReactNode;
}

function GlobalStyles({ children }: Props) {
  return <GlobalStyle>{children}</GlobalStyle>;
}


const GlobalStyle = styled.div` 
  padding: 2.5rem;
  display: flex;
  gap: 2.5rem;
  height: 100vh;


  .grid{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
`;

export default GlobalStyles