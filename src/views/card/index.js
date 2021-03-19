// @flow
import React from "react";
import styled from "styled-components";

import Tag from "./tag";

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
  width: 300px;
  min-height: 260px;
  &:hover {
    box-shadow: rgb(43 46 207 / 50%) 0px 5px 19px;
  }
`;
const Header = styled.div`
  margin: 10px;
  display: flex;
`;
const Title = styled.div`
  font-size: 18px;
  line-height: 29px;
  text-align: left;
  margin: 10px 0px 0px 20px;
`;
const Description = styled.div`
  margin: 10px 0px;
  color: ${(props) => props.theme.colors.darkGrey};
  font-size: 16px;
  line-height: 22px;
  text-align: left;
  max-height: 44px; /** 2 lines */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const Footer = styled.div``;
const Tags = styled.div``;
const Image = styled.img`
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
type Props = {
  id: string,
  description: string,
  html_url: string,
  files: Object,
  owner: Object,
};

const getTitle = (files: Object): string => Object.keys(files)[0];
const Card = ({ id, description, files, owner, html_url }: Props) => {
  return (
    <Container>
      <Header>
        <Image alt={owner.login} src={owner.avatar_url} />
        <Title>
          <a href={owner.html_url} target="_blank" rel="noopener noreferrer">
            {owner.login}
          </a>
          {` / `}
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            {getTitle(files)}
          </a>
        </Title>
      </Header>
      <Description title={description}>{description}</Description>
      <Tags>
        {Object.keys(files).map(
          (file, index) =>
            files[file].language && (
              <Tag key={index} text={files[file].language} />
            )
        )}
      </Tags>
      <Footer></Footer>
    </Container>
  );
};
export default Card;
