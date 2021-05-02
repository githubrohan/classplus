import React from "react";
import styled from "styled-components";

const Header = styled.header`
  max-width: 70rem;
  margin: 3rem auto 0 auto;
  text-align: center;
`;

const Img = styled.img`
  width: 100%;
  max-width: 25rem;
`;

export default function Heading() {
  return (
    <Header>
      <Img src="photoplus.png" />
    </Header>
  );
}
