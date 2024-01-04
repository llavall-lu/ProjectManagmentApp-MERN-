"use client";
import { useGlobalState } from "@/app/context/GlobalContextProvider";
import React from "react";
import styled from "styled-components";

interface Props {
    icon?: React.ReactNode;
    name?: string;
    background?: string;
    padding?: string;
    borderRadius?: string;
    fontWeight?: string;
    fontSize?: string;
    click?: () => void;
    type?: "submit" | "button" | "reset" | undefined;
    border?: string
};

function Button({
    icon,
    name,
    background,
    padding,
    borderRadius,
    fontWeight,
    fontSize,
    click,
    type,
    border
}: Props) {
    const { theme } = useGlobalState();
    
    return (
        <BtnStyle 
        type={type}
            style={{
                background: background,
                padding: padding || "1rem 2rem",
                borderRadius: borderRadius || "1rem",
                fontWeight: fontWeight || "500",
                fontSize: fontSize || "1rem",
                border: border || "none"
            }}
            theme={theme}
            onClick={click}
            >
                {icon && icon}
                {name}
        </BtnStyle>
    );
}

const BtnStyle = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colorWhite};
    z-index: 5;
    cursor: pointer;
    transition: all 0.55s ease;

    i{
        margin-right: 1rem;
        color: ${({ theme }) => theme.colorGrey2};
        font-size: 1.2rem;
        transition: all 0.55s ease;
    }

    &:hover {
        color: ${({theme}) => theme.colorGrey3};
        i {
          color: ${({theme}) => theme.colorGrey3};
        }
      }
`;

export default Button;