"use client";

import React from 'react'
import { SignUp } from '@clerk/nextjs';
import styled from 'styled-components';

function page() {
    return (
    <Styledsignup>
        <SignUp/>
    </Styledsignup>
    )
}
const Styledsignup = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

    .cl-internal-b3fm6y {
        display: none;
    }
    `;
export default page