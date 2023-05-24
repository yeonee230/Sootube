import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { serverUrl } from '../utils/api';
import Comment from './Comment';

export default function Comments({ videoId }) {
  //1. useState -> useEffect
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

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

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input placeholder='Add a comment...' /> 
        {/* TODO:comment 추가하는 기능 만들어야함. */}
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
