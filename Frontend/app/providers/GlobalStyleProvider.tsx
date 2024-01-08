"use client";
import styled from "styled-components";
import React from "react";

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

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
    transition: all 0.5s ease-in-out;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
`;

export default GlobalStyles;
