// @flow
import * as React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Card from "./card";

//hooks
import useGistsSearch from "../hooks/useGistsSearch";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  max-height: calc(100vh - 120px);
  margin: 20px 0px;
  justify-content: center;
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
const LoadMoreSpinner = styled.div`
  position: absolute;
  z-index: 1;
  font-size: 46px;
  height: calc(100vh - 120px);
  color: ${(props) => props.theme.colors.darkGrey};
  display: flex;
  align-items: center;
`;
type Props = {
  searchQuery?: string,
};
export default function InfiniteList({ searchQuery }: Props) {
  const [page, setPage] = React.useState(1);

  const { gists, hasMore, loading } = useGistsSearch(searchQuery, page);

  const observer = React.useRef();
  const lastGistElementRef = React.useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((page) => page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  React.useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  return (
    <>
      {gists.length ? (
        <Container>
          {loading ? (
            <LoadMoreSpinner>
              <StyledFontAwesomeIcon icon={faSpinner} spin />
            </LoadMoreSpinner>
          ) : null}
          {gists.map(({ id, description, files, owner, html_url }, index) => {
            let refProp = {};
            if (gists.length === index + 1) {
              refProp = { ref: lastGistElementRef };
            }
            return (
              <Card
                {...refProp}
                key={id}
                id={id}
                description={description}
                files={files}
                owner={owner}
                html_url={html_url}
              />
            );
          })}
        </Container>
      ) : null}

      {loading ? (
        <EmptyMessage>
          <StyledFontAwesomeIcon icon={faSpinner} spin />
          {"Loading please wait..."}
        </EmptyMessage>
      ) : searchQuery === "" ? (
        <EmptyMessage>{"Enter username to search the gists"}</EmptyMessage>
      ) : gists.length === 0 ? (
        <EmptyMessage>
          {"No gists found or incorrect username entered"}
        </EmptyMessage>
      ) : null}
    </>
  );
}
