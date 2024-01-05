"use client";
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { useGlobalState } from '../context/GlobalContextProvider';

function Page() {
  const {theme} = useGlobalState();
  return (
    <CalendarContainer theme={theme}>
      <Calendar />
    </CalendarContainer>
  );
}



const CalendarContainer = styled.div`
  position: fixed;
  top: 2.5rem;
  left: 300px;
  bottom: 2.5rem;
  width: 85%;
  height: 94%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    left: 0;
    width: 100%;
    height: 100%;
    bottom: 2.5rem;
  
    .react-calendar__tile {
      font-size: 1em !important; 
      line-height: 5.5em !important; 
    }
  }

  .react-calendar { 
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    background: ${(props) => props.theme.colorBg};
    color: ${(props) => props.theme.colorWhite};
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }

  
  .react-calendar__tile {
    font-size: 1.5em; 
    line-height: 7.5em; 
  }
  .react-calendar__navigation button {
    color: ${(props) => props.theme.colorPurple2};
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
   background: ${(props) => props.theme.calendarBg};
   color: ${(props) => props.theme.colorPurple2};
   border-radius: 6px;
  }
  .react-calendar__tile--now {
    background: ${(props) => props.theme.calendarBg2};
    border-radius: 6px;
    font-weight: bold;
    color: ${(props) => props.theme.colorPurple2};
   }
   .react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus {
 background: ${(props) => props.theme.calendarBg2};
 border-radius: 6px;
 font-weight: bold;
 color: ${(props) => props.theme.colorPurple2};
}
.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus {
 background: ${(props) => props.theme.calendarBg};
}
.react-calendar__tile--active {
  background: ${(props) => props.theme.colorPurple2};
  border-radius: 6px;
  font-weight: bold;
  color: white;
 }
 .react-calendar__tile--active:enabled:hover,
.react-calendar__tile--active:enabled:focus {
 background: ${(props) => props.theme.colorPurple2};
 color: white;
}
.react-calendar--selectRange .react-calendar__tile--hover {
  background-color: ${(props) => props.theme.calendarBg};
 }
 .react-calendar__tile--range {
  background: ${(props) => props.theme.calendarBg};
  color: ${(props) => props.theme.colorPurple2};
  border-radius: 0;
 }
 .react-calendar__tile--rangeStart {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background: ${(props) => props.theme.colorPurple2};
  color: white;
 }
 .react-calendar__tile--rangeEnd {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  background: ${(props) => props.theme.colorPurple2};
  color: white;

 
 }
`;
export default Page;