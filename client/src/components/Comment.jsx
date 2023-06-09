import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'timeago.js';
import { serverUrl } from '../utils/api';

// 해당 비디오의 코멘트 보여주기 
export default function Comment({ comment }) {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(`${serverUrl}/users/find/${comment.userId}`);
        setChannel(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel.name} <Date>{format(comment.createdAt)}</Date>
        </Name>

        <Text>{comment.desc}</Text>
       
      </Details>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;
const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

