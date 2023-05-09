import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { RiShareForwardLine, RiDownloadLine } from 'react-icons/ri';
import Comments from '../components/Comments';
import VideoCard from '../components/VideoCard';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { fetchSuccess } from '../redux/videoSlice';
import { format } from 'timeago.js';
const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;
const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
`;
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: black;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 20px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

export default function Video() {
  const {currentUser} = useSelector((state) => state.user)
  const {currentUser:currentVideo} = useSelector((state) => state.video)
 
  const dispatch = useDispatch()
  const path = useLocation().pathname.split('/')[2]
  
  const [channel, setChannel] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`)
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)

        setChannel(channelRes.data)
        dispatch(fetchSuccess(videoRes.data))
     
      } catch (error) {
        console.log("error::",error)
      }
    }

    fetchData()
   

  }, [path,dispatch])

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            title='title'
            width='100%'
            height='600'
            src='https://www.youtube.com/watch?v=AjnByCGS2Bs'
            frameborder='0'
            // allow='accelerometer;autoplay;clipboard-write;encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.views} views • 123123</Info>
          <Buttons>
            <Button>
              <AiOutlineLike />
              {currentVideo.likes?.length}
            </Button>
            <Button>
              <AiOutlineDislike />
              Dislike
            </Button>
            <Button>
              <RiShareForwardLine />
              Share
            </Button>
            <Button>
              <RiDownloadLine />
              Download
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>
              비디오 설명
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>Subscribe</Subscribe>
        </Channel>
        <Hr />
        <Comments />
      </Content>
      {/* <Recommendation>
        <VideoCard type="sm"/>
        <VideoCard type="sm"/>
        <VideoCard type="sm"/>
      </Recommendation> */}
    </Container>
  );
}
