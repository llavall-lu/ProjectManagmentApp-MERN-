import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import styled from 'styled-components';

const Navbar = () => {
    return (
      <Nav>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button>
              Sign in
            </Button>
          </SignInButton>
        </SignedOut>
      </Nav>
    );
  };


const Nav = styled.nav`
display: flex;
justify-content: center;
width: 100%;
`;

const Button = styled.button`
  background-color: #5128e2;
  color: #212121  ;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
`;

export default Navbar;