import React from "react";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-search";

type Props = {
  initialQuery?: string;
  placeholder?: string;
  delay?: number;
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<Props> = ({
  initialQuery = "",
  delay = 300,
  onSearch,
  placeholder = "Type to Search ...",
}) => {
  const { query, setQuery } = useSearch(onSearch, initialQuery, delay);

  return (
    <div className="relative w-full">
      <Input
        type="text"
        id="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-5 focus:border-gray-200"
      />
    </div>
  );
};

export default SearchBar;
