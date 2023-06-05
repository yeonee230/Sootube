import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { serverUrl } from '../utils/api';
import VideoCard from './VideoCard';

export default function Recommendation({ tags,videoId }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${serverUrl}/videos/tags?tags=${tags}&videoId=${videoId}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags,videoId]);

  return (
   
    <Container>
      { videos.length === 0  ? <h4>😭 연관비디오가 없습니다.</h4> : videos.map((video) => { 
        return (
          <VideoCard
            type='sm'
            key={video._id}
            video={video}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  flex: 2;
`;
