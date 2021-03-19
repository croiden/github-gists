// @flow
import * as React from "react";
import styled from "styled-components";
import { Octokit } from "@octokit/core";

import Card from "./card";

const octokit = new Octokit();

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const SearchConatiner = styled.div``;
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  height: calc(100vh - 100px);
`;
const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  font-style: italic;
  color: #5a5959;
  font-size: 20px;
`;
const Main = () => {
  const [username, setUsername] = React.useState("");
  const [startSearch, setStartSearch] = React.useState(false);
  const [gists, setGists] = React.useState([]);

  const handleChange = (event) => {
    setUsername(event.target.value.trim());
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    username && setStartSearch(true);
  };

  React.useEffect(() => {
    if (startSearch) {
      let cancel = false;
      setStartSearch(false);
      async function fetchGists() {
        try {
          const response = await octokit.request(
            "GET /users/{username}/gists",
            {
              username: username,
            }
          );
          if (!cancel) {
            setGists(response.data);
          }
        } catch (e) {
          console.error(e);
          if (!cancel) {
            setGists([]);
          }
        }
      }
      fetchGists();
      return () => {
        cancel = true;
      };
    }
  }, [startSearch, username]);
  return (
    <Container>
      <SearchConatiner>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="search"
              placeholder="Enter username"
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Search" />
        </form>
      </SearchConatiner>

      {gists.length ? (
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
      ) : username === "" ? (
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
