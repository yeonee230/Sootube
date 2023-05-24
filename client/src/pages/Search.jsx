
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import VideoCard from '../components/VideoCard';
import { serverUrl } from '../utils/api';

export default function Search() {

    const [videos, setVideos] = useState([])
    const query = useLocation().search

    useEffect(() => {
    const fetchVideos = async () =>{
        const res = await axios.get(`${serverUrl}/videos/search${query}`)
        setVideos(res.data)
    }
    fetchVideos()
    }, [query])
    return (
        <Continer>
            {videos.map(video =>  <VideoCard key={video._id} video={video} />)}
        </Continer>
    );
}

const Continer = styled.div`
    display:flex;
    flex-wrap:wrap;
    gap:10px;
`
