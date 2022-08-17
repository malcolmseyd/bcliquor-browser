import _data from "./json/data.json";
import { Data } from "./json/data";
import _categories from "./json/categories.json";
import { Categories } from "./json/categories";
import _metadata from "./json/metadata.json";
import { Metadata } from "./json/metadata";

import "bulma/css/bulma.min.css";
import "./App.css";

import { useMemo, useState } from "react";
import _ from "lodash";
import Fuse from "fuse.js";

import { SortState, Table } from "./Table";
import { Filter } from "./Filter";
import { Pagination } from "./Pagination";
import { Info } from "./Info";
import { Search } from "./Search";

const data = _data as Data[];
const categories = _categories as Categories;
const metadata = {
  ..._metadata,
  scrapedAt: new Date(_metadata.scrapedAt),
} as Metadata;

function App() {
  const [filter, setFilter] = useState<(data: Data) => boolean>(
    () => () => true
  );

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(Math.min(data.length, 1000));
  const [sortState, setSortState] = useState<SortState>({
    column: "millsPerDollar",
    descending: true,
  });
  const [search, setSearch] = useState<string>("");

  const searchedData = useMemo<Data[]>(() => {
    if (search === "") {
      return data;
    }
    const fuse = new Fuse(data, { keys: ["name"], threshold: 0.3 });
    return fuse.search(search).map((x) => x.item);
  }, [search]);

  const sortedData = useMemo<Data[]>(() => {
    const sorted = _.sortBy(searchedData, sortState.column);
    if (sortState.descending) {
      return sorted.reverse();
    }
    return sorted;
  }, [sortState, searchedData]);

  const filteredData = useMemo<(Data & { rank: number })[]>(
    () => sortedData.filter(filter).map((x, i) => ({ ...x, rank: i + 1 })),
    [sortedData, filter]
  );

  return (
    <div>
      <header>
        <div className="block">
          <h1 className="title">BC Liquor Store Browser</h1>
          <p>
            This data was last updated at{" "}
            <a href="https://github.com/malcolmseyd/bcliquor-browser/actions/workflows/rebuild.yml">
              {metadata.scrapedAt.toLocaleString()}
            </a>
          </p>
        </div>
        <div className="block">
          <Info />
        </div>
      </header>
      <hr />
      <Filter {...{ filter, setFilter, categories, data }} />
      <hr />
      <Pagination {...{ page, setPage, limit, setLimit, data: filteredData }} />
      <hr />
      <Search {...{ search, setSearch }} />
      <hr />
      <Table
        {...{
          data: filteredData.slice(page * limit, (page + 1) * limit),
          sortState,
          setSortState,
        }}
      />
    </div>
  );
}

export default App;
