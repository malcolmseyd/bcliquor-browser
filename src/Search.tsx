import _ from "lodash";
import { useMemo, useState } from "react";

type SearchProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export function Search({ search, setSearch }: SearchProps) {
  const [displaySearch, setDisplaySearch] = useState(search);

  const debouncedSetSearch = useMemo(
    () => _.debounce(setSearch, 100),
    [setSearch]
  );

  return (
    <div>
      Search:{" "}
      <input
        type="search"
        onInput={(e) => {
          setDisplaySearch(e.currentTarget.value);
          debouncedSetSearch(e.currentTarget.value);
        }}
        value={displaySearch}
      />
    </div>
  );
}
