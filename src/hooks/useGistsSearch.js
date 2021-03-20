// @flow
import { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";

import { AUTH } from "../auth/";

const octokit = new Octokit({
  auth: AUTH,
});

const PAGE_SIZE = 30;
export default function useGistsSearch(query?: string, page: number) {
  const [loading, setLoading] = useState(false);
  const [gists, setGists] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setGists([]);
  }, [query]);

  useEffect(() => {
    if (query) {
      setLoading(true);
      let cancel;
      async function fetchGists() {
        try {
          const response = await octokit.request(
            "GET /users/{username}/gists",
            {
              username: query,
              per_page: PAGE_SIZE,
              page: page,
            }
          );
          if (!cancel) {
            setGists((prevGists) => [
              ...new Set([...prevGists, ...response.data]),
            ]);
            setHasMore(response.data.length === PAGE_SIZE);
            setLoading(false);
          }
        } catch (e) {
          console.error(e);
          if (!cancel) {
            setLoading(false);
          }
        }
      }
      fetchGists();
      return () => {
        cancel = true;
      };
    }
  }, [query, page]);

  return { loading, gists, hasMore };
}
