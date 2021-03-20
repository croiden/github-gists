// @flow
import * as React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import CardContainer from "./infinitelist";

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
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 20px;
`;
const Main = () => {
  const [username, setUsername] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

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
      <CardContainer searchQuery={searchQuery} />
    </Container>
  );
};
export default Main;
