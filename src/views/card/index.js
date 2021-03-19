// @flow
import * as React from "react";
import styled from "styled-components";
import { Octokit } from "@octokit/core";
import ReactTooltip from "react-tooltip";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";

import Tag from "./tag";
import Avatar, { small } from "../avatar";

const octokit = new Octokit();

const Container = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
  width: 300px;
  min-height: 260px;
  &:hover {
    box-shadow: rgb(43 46 207 / 50%) 0px 5px 19px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    width: calc(100vw - 20px);
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
  word-break: break-all;
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
const Footer = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
`;
const Tags = styled.div`
  margin-bottom: 50px;
`;
const StyledAvatar = styled(Avatar)`
  margin: 0px 4px;
`;
const ForksText = styled.div`
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  color: ${(props) => props.theme.colors.darkGrey};
`;
const ForkIcon = styled.div`
  height: 30px;
  width: 30px;
  color: ${(props) => props.theme.colors.darkGrey};
  text-align: center;
  line-height: 30px;
`;
type Props = {
  id: string,
  description: string,
  html_url: string,
  files: Object,
  owner: Object,
  forks_url: string,
};

const getTitle = (files: Object): string => Object.keys(files)[0];
const Card = ({
  id,
  description,
  files,
  owner,
  html_url,
  forks_url,
}: Props) => {
  const [forks, setForks] = React.useState([]);
  const [totalForks, setTotalForks] = React.useState(0);
  React.useEffect(() => {
    if (forks_url) {
      let cancel = false;
      async function fetchGists() {
        try {
          const response = await octokit.request("GET /gists/{gist_id}/forks", {
            gist_id: id,
            per_page: 100,
          });
          if (!cancel) {
            const respData = response.data;
            setTotalForks(respData.length);
            setForks(
              respData
                .sort((a, b) =>
                  new Date(a.created_at) > new Date(b.created_at) ? -1 : 0
                )
                .splice(0, 3)
            );
          }
        } catch (e) {
          console.error(e);
          if (!cancel) {
          }
        }
      }
      fetchGists();
      return () => {
        cancel = true;
      };
    }
  }, [forks_url, id]);
  return (
    <Container>
      <Header>
        <Avatar username={owner.login} url={owner.avatar_url} />
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
      <Description data-tip={description}>{description}</Description>
      <Tags>
        {Object.keys(files).map(
          (file, index) =>
            files[file].language && (
              <Tag key={index} text={files[file].language} />
            )
        )}
      </Tags>
      <Footer>
        {forks.map(({ owner }) => (
          <StyledAvatar
            key={owner.id}
            username={owner.login}
            url={owner.avatar_url}
            size={small}
          />
        ))}
        <ForkIcon>
          <FontAwesomeIcon icon={faCodeBranch} />
        </ForkIcon>
        {totalForks < 4 ? (
          <ForksText>{`${totalForks} forks`}</ForksText>
        ) : (
          <ForksText>{`+${totalForks - 3} forks more`}</ForksText>
        )}
      </Footer>
      <ReactTooltip />
    </Container>
  );
};
export default Card;
