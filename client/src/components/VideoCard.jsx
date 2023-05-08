import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {format} from 'timeago.js'
import axios from 'axios';

const Container = styled.div`
  width: ${(props)=>props.type !== "sm" && "360px"};
  border: 1px solid #ccc;
  margin-bottom: ${(props)=>props.type === "sm" ? "10px" : "45px"};
  cursor: pointer;
  display: ${(props)=>props.type === "sm" && "flex"};
  gap: 10px;
`;
const Image = styled.img`
  background-color: #999;
  width: 100%;
  height: ${(props)=>props.type === "sm" ? "120px" : "202px"};
  flex: 1;
`;
const Details = styled.div`
  display: flex;
  margin-top:  ${(props)=>props.type === "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;
const ChannelImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #777;
  display: ${(props)=>props.type === "sm" && "none"};
`;
const Texts = styled.div``;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0;
`;
const Info = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.textSoft};
`;

export default function VideoCard({video,type}) {
  const navigate = useNavigate();

  const [channel, setChannel] = useState({})

  useEffect(() => {
      const fetchChannel = async () =>{
          const res = await axios.get(`/users/find/${video.userId}`)
          console.log("res:",res)
          setChannel(res.data)
      }
      fetchChannel()
  }, [video.userId])

  return (
    <Container
      onClick={() =>
        navigate(`/videos/watch/:videoId`,{ state: { video }})
      }
      type={type}
    >
      <Image type={type} src={video.imgUrl}/>
      <Details type={type}>
        <ChannelImg type={type} src={channel.img}/>
        <Texts>
          <Title>{video.title}</Title>
          <ChannelName>{channel.name}</ChannelName>
          <Info>{video.views} views • {format(video.createAt)}</Info>
        </Texts>
      </Details>
    </Container>
  );
}
