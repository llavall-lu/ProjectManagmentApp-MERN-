"use client";
import { useGlobalState } from '@/app/context/GlobalContextProvider'
import React from 'react'
import styled from 'styled-components'
import CreateTask from '../modal/CreateTask';

function tasks() {
    const {theme} = useGlobalState()

  return (
    <TaskStyle theme={theme}>
      <CreateTask/>
      </TaskStyle>
  )
}

const TaskStyle = styled.main`
padding: 2rem;
    width: 100%;
    background-color: ${(props) => props.theme.colorBg2};
    border: 2px solid ${(props) => props.theme.borderColor2};
    border-radius: 1rem;
    height: 100%;

    overflow-y: auto;

    &webkit-scrollbar {
        width: 0.5rem;
    }
`

export default tasks