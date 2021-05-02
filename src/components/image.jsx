import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function Image({ url, setSelectedImage }) {
  return (
    <Img
      src={url}
      onClick={() => setSelectedImage(url)}
      whileHover={{ opacity: 0.5 }}
    />
  );
}
