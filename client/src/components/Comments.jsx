import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { serverUrl } from '../utils/api';
import { getCookie } from '../utils/cookie';
import Comment from './Comment';

//코멘트 달기 
export default function Comments({ videoId }) {
  //1. useState -> useEffect
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const jwtCookie = getCookie('access_token');
  const navigate = useNavigate();
  const [input, setInput] = useState('');//comment 달기 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${serverUrl}/comments/${videoId}`);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [videoId]);

  const handleChange = (e) =>{
    setInput( () => e.target.value )
  }

  const handleComment = async (e) =>{
    e.preventDefault();
      try {
        const res = await axios.post(`${serverUrl}/comments`,{videoId, user: currentUser, desc : input },{
          headers: {
            "Authorization": `Bearer ${jwtCookie}`
          }}).then(
         console.log('add comment')
        ); 
        setComments(res.data);
        res.status === 200 && navigate(`/videos/${videoId}`);
      } catch (error) {
        console.log(error);
      }
    
  }

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input placeholder='Add a comment...' onChange={handleChange}/> 
        <Button onClick={handleComment}>Comment</Button>
      </NewComment>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
        />
      ))}
    </Container>
  );
}

const Container = styled.div``;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  background-color: black;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 20px;
  height: max-content;
  padding: 10px;
  font-size: 12px;
  cursor: pointer;
`;
