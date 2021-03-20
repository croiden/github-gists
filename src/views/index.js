// @flow
import * as React from "react";
import styled from "styled-components";
import { Octokit } from "@octokit/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faSearch } from "@fortawesome/free-solid-svg-icons";

import { AUTH } from "../auth/";
import Card from "./card";

const octokit = new Octokit({
  auth: AUTH,
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const SearchConatiner = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledForm = styled.form`
  display: flex;
  width: 480px;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    margin-top: 10px;
    width: calc(100vw - 20px);
  }
`;
const StyledInput = styled.input`
  width: 100%;
  height: 60px;
  border: 3px solid ${(props) => props.theme.colors.primary};
  border-right: none;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: ${(props) => props.theme.colors.darkGrey};
  font-size: 20px;
  padding: 5px 20px;
  &:focus {
    color: ${(props) => props.theme.colors.primary};
  }
`;
const SearchButton = styled.button`
  height: 60px;
  border: 1px solid ${(props) => props.theme.colors.primary};
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 0 5px 5px 0;
  padding: 10px 20px;
  cursor: pointer;
  svg {
    margin: 0px;
  }
`;
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  max-height: calc(100vh - 120px);
  margin: 20px 0px;
  justify-content: center;
}
`;
const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  font-style: italic;
  color: ${(props) => props.theme.colors.darkGrey};
  font-size: 20px;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 20px;
`;
const Main = () => {
  const [username, setUsername] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [gists, setGists] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    const value = event.target.value.trim();
    setUsername(value);
    if (!value) {
      setSearchQuery("");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    username && setSearchQuery(username);
  };

  React.useEffect(() => {
    if (searchQuery) {
      let cancel = false;
      setLoading(true);
      async function fetchGists() {
        try {
          const response = await octokit.request(
            "GET /users/{username}/gists",
            {
              username: searchQuery,
              per_page: 100,
            }
          );
          if (!cancel) {
            setGists(response.data);
            setLoading(false);
          }
        } catch (e) {
          console.error(e);
          if (!cancel) {
            setGists([]);
            setLoading(false);
          }
        }
      }
      fetchGists();
      return () => {
        cancel = true;
      };
    }
  }, [searchQuery]);

  return (
    <Container>
      <SearchConatiner>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput
            type="search"
            name="search"
            placeholder="search gists by username"
            onChange={handleChange}
            required
            autocomplete="off"
          />
          <SearchButton type="submit" aria-label="search button">
            <StyledFontAwesomeIcon icon={faSearch} size="lg" />
          </SearchButton>
        </StyledForm>
      </SearchConatiner>
      {loading ? (
        <EmptyMessage>
          <StyledFontAwesomeIcon icon={faSpinner} spin />
          {"Loading please wait..."}
        </EmptyMessage>
      ) : gists.length ? (
        <CardContainer>
          {gists.map(({ id, description, files, owner, html_url }) => (
            <Card
              key={id}
              id={id}
              description={description}
              files={files}
              owner={owner}
              html_url={html_url}
            />
          ))}
        </CardContainer>
      ) : searchQuery === "" ? (
        <EmptyMessage>{"Enter username to search the gists"}</EmptyMessage>
      ) : gists.length === 0 ? (
        <EmptyMessage>
          {"No gists found or incorrect username entered"}
        </EmptyMessage>
      ) : null}
    </Container>
  );
};
export default Main;
