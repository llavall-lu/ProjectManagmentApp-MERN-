"use client";

import { useGlobalState } from "@/app/context/GlobalContextProvider";
import React from "react";
import styled from "styled-components";

interface Props {
  taskContent: React.ReactNode;
}

function Modal({ taskContent }: Props) {
  const { theme } = useGlobalState();
  const { closeModal } = useGlobalState();
  return (
    <ModalStyle theme={theme}>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content">{taskContent}</div>
    </ModalStyle>
  );
}
const ModalStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;

    display: flex;
    justify-content: center;
    align-items: center;

    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0,0,0,0.5);
        filter: blur(5px);
    }

    .modal-content {
        padding: 2rem;
        position: relative;
        width: 50%;
        max-width: 50rem;
        z-index: 100;
        border : 2px solid ${(props) => props.theme.borderColor2};
        border-radius: 1rem;
        background-color: ${(props) => props.theme.colorBg};
        box-shadow: 0 0 1rem rgba(0,0,0,0.5);
        border: 2px solid ${(props) => props.theme.borderColor2};


        @media (max-width: 768px) {
            width: 85%;
            height: 90vh;
            border-radius: 0;
            max-width: none;
            padding: 1rem;
        }
    }

    }

    
`;
export default Modal;
