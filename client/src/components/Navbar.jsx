import React from 'react';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bg};
  height: 56px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  justify-content: flex-end;
  position: relative;
`;
const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  padding: 7px;
  background-color: transparent;
  border: 1px solid #ccc;
  color: #3ea6ff;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 15px;
`;
export default function Navbar() {
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder='Search...' />
          <BiSearch />
        </Search>
        <Link
          to='/signin'
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Button>
            <CgProfile />
            Sign in
          </Button>
        </Link>
      </Wrapper>
    </Container>
  );
}
