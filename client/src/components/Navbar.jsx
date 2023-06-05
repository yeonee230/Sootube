import React, { useState } from 'react';
import styled from 'styled-components';
import { CgProfile } from 'react-icons/cg';
import { BiSearch } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import Upload from './Upload';
import { logout } from '../redux/userSlice';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout(''));
    alert('😭 Good bye!');
    navigate('/');
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder='Search...'
              onChange={(e) => setQ(e.target.value)}
            />
            {/* <BiSearch
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/search?q=${q}`)}
            /> */}
            <SearchBtn>
              <BiSearch onClick={() => navigate(`/search?q=${q}`)} />
            </SearchBtn>
          </Search>
          {currentUser ? (
            <User>
              <UploadBtn onClick={() => setOpen(true)}>
                <AiOutlineVideoCamera />
              </UploadBtn>
              <Avatar src={currentUser.img} />
              {currentUser.name}
              <Button onClick={handleLogout}>Log Out</Button>
            </User>
          ) : (
            <Link
              to='/signin'
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button>
                <CgProfile />
                Sign in
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
}

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
  height: 30px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 20px;
  color: ${({ theme }) => theme.text};
  padding: 0 8px;
`;
const Input = styled.input`
  border: none;
  width: 100%;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  outline: none;
`;
const SearchBtn = styled.button`
  border-radius: 0 40px 40px 0;
  cursor: pointer;
  /* background: ${({ theme }) => theme.soft}; */
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  padding: 7px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.soft};
  color: #3ea6ff;;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 15px;
  &:hover {
    background-color: rgb(61, 166, 255, 0.3);
    border: 1px solid rgb(61, 166, 255, 0.3);
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  font-size: 18px;
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const UploadBtn = styled.div`
  cursor: pointer;
`;
