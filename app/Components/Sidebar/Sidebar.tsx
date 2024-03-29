"use client";
import { useGlobalState } from "@/app/context/GlobalContextProvider";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import menu from "@/app/utils/menu";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/app/Components/Button/btn";
import { arrowLeft, navbars, signout } from "@/app/utils/icons";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";

function Sidebar() {
  // Use global state to get theme, collapsed, and collapsedSidebar
  const { theme, collapsed, collapsedSidebar } = useGlobalState();
  const { signOut } = useClerk(); // Use clerk to get the signOut function
  const { user } = useUser(); // Use clerk to get the user
  console.log(user);

  // Destructure the user object to get the first name, last name, and image url
  const { firstName, lastName, imageUrl } = user || {
    firstName: "",
    lastName: "",
    imageUrl: "",
  };
  // Use the next router to get the path name
  const router = useRouter();
  const pathName = usePathname();

  // Handle the click event for the sidebar items
  const handleClick = (a: string) => {
    router.push(a);
  };

  console.log(theme);

  return (
    <SidebarStyle theme={theme} collapsed={collapsed}>
      {/* Button to toggle sidebar */}
      <button className="nav-toggle" onClick={collapsedSidebar}>
        {collapsed ? navbars : arrowLeft}
      </button>

      {/* User profile section */}
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image width={70} height={70} src={imageUrl} alt="profile" />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        <h1 className="capitalize">
          {firstName} {lastName}
        </h1>
      </div>

      {/* Navigation items */}
      <ul className="nav-items">
        {menu.map((item) => {
          const link = item.link;

          return (
            <li
              key={item.id}
              className={`nav-item ${pathName === link ? "active" : ""}`}
              onClick={() => handleClick(link)}
            >
              {item.icon}
              <a href={link}>{item.title}</a>
            </li>
          );
        })}
      </ul>

      {/* Sign out button */}
      <div className="signOut cl-userButtonPopoverActionButton__signOut">
        <Button
          name={"Sign Out"}
          background={theme.colorRed}
          padding={"0.8rem 1rem"}
          borderRadius={"0.5rem"}
          fontWeight={"500"}
          fontSize={"1rem"}
          icon={signout}
          click={() => signOut(() => router.push("/signin"))}
        />
      </div>
    </SidebarStyle>
  );
}

const SidebarStyle = styled.nav<{ collapsed: boolean }>`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colorGrey3};

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 100;

    transition: all 0.3s ease-in-out;
    transform: ${(props) =>
      props.collapsed ? "translateX(-100%)" : "translateX(0)"};

    .nav-toggle {
      display: block !important;
    }
  }
  .nav-toggle {
    display: none;
    position: absolute;
    top: 5rem;
    right: -3rem;
    padding: 1rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background-color: ${(props) => props.theme.colorBg2};
    border-right: 2px solid ${(props) => props.theme.borderColor2};
  }

  .cl-internal-wkkub3 {
    display: none;
  }

  .user-btn {
    .cl-rootBox {
      width: 100%;
      height: 100%;

      .cl-userButtonBox {
        width: 100%;
        height: 100%;

        .cl-userButtonTrigger {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }

  .profile {
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};
    display: flex;
    align-items: center;

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: 0;
      background: ${(props) => props.theme.colorBg3};
      transition: all 0.55s linear;
      border-radius: 1rem;
      border: 2px solid ${(props) => props.theme.borderColor2};
      opacity: 0.2;
    }

    h1 {
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;
      line-height: 1.4rem;
    }

    .image,
    h1 {
      position: relative;
      z-index: 1;
    }

    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius: 100%;
      width: 70px;
      height: 70px;

      img {
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }

    > h1 {
      margin-left: 0.3rem;
      font-size: clamp(1.2rem, 4vw, 1.4rem);
      line-height: 100%;
    }

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2};
      }
    }
  }

  .nav-item {
    position: relative;
    padding: 0.8rem 1rem 0.9rem 2rem;
    margin: 0.3rem 0;

    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.activeNavLinkHover};
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }

    &::before {
      position: absolute;
      content: "";
      right: 0;
      top: 0;
      width: 0%;
      height: 100%;
      background-color: ${(props) => props.theme.colorPurple};

      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }

    a {
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      z-index: 2;
      line-height: 0;
    }

    i {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colorIcons};
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }

  .active {
    background-color: ${(props) => props.theme.activeNavLink};

    i,
    a {
      color: ${(props) => props.theme.colorIcons2};
    }
  }

  .active::before {
    width: 0.3rem;
  }

  > button {
    margin: 1.5rem;
  }

  .signOut {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Sidebar;
