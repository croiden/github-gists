// @flow
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  background-image: ${(props) =>
    `linear-gradient(135deg, ${props.theme.colors.tagBg}, ${props.theme.colors.purple})`};
  border-radius: 11.5px;
  height: 18px;
  margin-right: 10px;
  margin-top: 10px;
`;

const Text = styled.div`
  color: ${(props) => props.theme.colors.white};
  font-size: 10px;
  line-height: 18px;
  text-transform: uppercase;
  padding: 2px 10px;
  font-weight: 500;
`;

type Props = {
  text: string,
};

const Tag = ({ text }: Props) => {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};
export default Tag;
