import React from "react";
import styled from "styled-components";

const Img = styled.img`
  margin: auto;
  justify-content: center;
  max-width: 500px;
`;

export default function Notfound() {
  return <Img src="no-search-found.png" />;
}
