import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate,Link } from 'react-router-dom';
import { serverUrl } from '../utils/api';

export default function SignIn() {
  // const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(`${serverUrl}/auth/signin`, {
        email,
        password,
      });
      console.log('login res :: ',res)
      
      dispatch(loginSuccess(res.data));
      navigate('/')
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  
  const signInWithGoogle = async () => {
    dispatch(loginStart())
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post(`${serverUrl}/auth/google`, {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            navigate('/')
          });
      })
      .catch((error) => {
        dispatch(loginFailure())
      });
  };
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to Sootube</SubTitle>
        <Input
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign In</Button>
        <Title>OR</Title>
        <Button onClick={signInWithGoogle}>Sign in with Google </Button>
        
        <Link to='/signup'>
        <GotoLink>Create account</GotoLink>
        </Link>
      </Wrapper>
      <More>
        English(USA)
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
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
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
  background-color: #1464d5;;
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