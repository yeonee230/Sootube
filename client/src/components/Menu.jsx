import React from 'react';
import styled from 'styled-components';
import { BsYoutube } from 'react-icons/bs';
import { AiFillHome, AiOutlineTrophy, AiOutlineSetting } from 'react-icons/ai';
import {
  MdOutlineExplore,
  MdOutlineSubscriptions,
  MdVideoLibrary,
  MdHistory,
  MdLibraryMusic,
  MdOutlineMovie,
  MdHelpOutline,
} from 'react-icons/md';
import { CgMediaLive, CgProfile, CgDarkMode } from 'react-icons/cg';
import { HiOutlineFlag, HiOutlineNewspaper } from 'react-icons/hi';
import { RiGamepadLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bg};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
  font-size: 18px;
`;

const Icon = styled.div`
  margin: 0;
  padding: 0;
  color: #ff0000;
  display: flex;
  align-items: center;
  font-size: 30px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  font-size: 14px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Login = styled.div`
  font-size: 12px;
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 20px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export default function Menu({ darkMode, setDarkMode }) {
  return (
    <Container>
      <Wrapper>
        <Link
          to='/'
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Logo>
            <Icon>
              <BsYoutube />
            </Icon>
            SooTube
          </Logo>
        </Link>

        <Link
          to='/'
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
        <Item>
          <AiFillHome />
          Home
        </Item>
        </Link>
        <Link
          to='/trends'
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Item>
            <MdOutlineExplore />
            Explore
          </Item>
        </Link>
        <Link
          to='/subscriptions'
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
        <Item>
          <MdOutlineSubscriptions />
          Subscription
        </Item>
        </Link>
        <Hr />
        <Item>
          <MdVideoLibrary />
          Library
        </Item>
        <Item>
          <MdHistory />
          History
        </Item>
        <Hr />
        <Login>
          Sign in like videos, comment and subscribe.
          <Link
            to='/signin'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button>
              <CgProfile />
              Sign in
            </Button>
          </Link>
        </Login>
        <Hr />
        <Item>
          <MdLibraryMusic />
          Music
        </Item>
        <Item>
          <AiOutlineTrophy />
          Sports
        </Item>
        <Item>
          <RiGamepadLine />
          Gaming
        </Item>
        <Item>
          <MdOutlineMovie />
          Movies
        </Item>
        <Item>
          <HiOutlineNewspaper />
          News
        </Item>
        <Item>
          <CgMediaLive />
          Live
        </Item>
        <Hr />
        <Item>
          <AiOutlineSetting />
          Settings
        </Item>
        <Item>
          <HiOutlineFlag />
          Report
        </Item>
        <Item>
          <MdHelpOutline />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <CgDarkMode />
          {darkMode ? 'Light' : 'Dark'} Mode
        </Item>
      </Wrapper>
    </Container>
  );
}
