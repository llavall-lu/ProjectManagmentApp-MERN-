"use client";

import React from 'react'
import { SignIn } from '@clerk/nextjs';
import styled from 'styled-components';

function page() {
  return (
    <Styledsignin >
        <SignIn/>
    </Styledsignin>
  )
}

const Styledsignin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .cl-internal-b3fm6y {
    display: none;
}
`;

export default page