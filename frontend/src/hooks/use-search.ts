import { useState, useCallback, useEffect, useMemo } from "react";
import { useUrlParams } from "./use-params";
import { debounce } from "../utils/debounce";

export function useSearch(
  onSearch: (query: string) => void,
  initialQuery: string = "",
  delay: number = 300
) {
  const { getUrlParam, setUrlParam } = useUrlParams();
  const [query, setQuery] = useState(
    initialQuery || getUrlParam("query") || ""
  );
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedQuery(value);
        onSearch(value);
        setUrlParam({ query: value });
      }, delay),
    [delay, onSearch, setUrlParam]
  );

  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value);
      if (value.trim() === "") {
        debouncedSearch.cancel();
        setDebouncedQuery("");
        onSearch("");
        setUrlParam({ query: "" });
      } else {
        debouncedSearch(value);
      }
    },
    [debouncedSearch, onSearch, setUrlParam]
  );

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setDebouncedQuery(initialQuery);
      onSearch(initialQuery);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [initialQuery, onSearch, debouncedSearch]);

  return { query, setQuery: handleQueryChange, debouncedQuery };
}
