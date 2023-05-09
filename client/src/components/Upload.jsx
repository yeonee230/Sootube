import React from 'react';
import styled from 'styled-components';

export default function Upload({ setOpen }) {
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>
        <Label htmlFor='video'>Video file : </Label>
        <Input
          id='video'
          type='file'
          accept='video/*'
        />
        <Label>Video Info</Label>
        <Input
          type='text'
          placeholder='Title'
        />
        <Desc
          placeholder='Descripton'
          rows={8}
        />
        <Input
          type='text'
          placeholder='Separate the tags with commas(,).'
        />
        <Label htmlFor='thumb'>Thumbnail Image : </Label>
        <Input
          id='thumb'
          type='file'
          accept='image/*'
        />
        <Button>Upload</Button>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000be;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLigther};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 1;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textSoft};
  background-color: ${({ theme }) => theme.soft};
  font-weight: 500;
  padding: 10px 20px;
`;

const Label = styled.label`
  font-size: 14px;
`;
