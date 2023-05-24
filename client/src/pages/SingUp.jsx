import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function SingUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Container>
      <Wrapper>
        <Title>Sign up</Title>
        <Input
          placeholder='username'
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type='password'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Sign Up</Button>
        <Link to='/signin'>
          <GotoLink>Sign in instead</GotoLink>
        </Link>
      </Wrapper>
      <More>
        English(USA) {name},{email},{password}
        <Links>
          <LinkItem>Help</LinkItem>
          <LinkItem>Privacy</LinkItem>
          <LinkItem>Terms</LinkItem>
        </Links>
      </More>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
  flex-direction: column;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 70px;
  gap: 10px;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 300;
  cursor: pointer;
  background-color: #1464d5;
  color: white;
  &:hover {
    transition: all .2s ease-in-out;
    background-color: #3ea6ff;
  }
`;
const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 10px;
  color: ${({ theme }) => theme.textSoft};
`;
const Links = styled.div`
  margin-left: 50px;
`;
const LinkItem = styled.span`
  margin-left: 30px;
`;

const GotoLink = styled.span`
    color: #1464d5;
    font-size: 12px;
    
`