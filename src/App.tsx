import _data from "./json/data.json";
import { Data } from "./json/data";
import _categories from "./json/categories.json";
import { Categories } from "./json/categories";
import _metadata from "./json/metadata.json";
import { Metadata } from "./json/metadata";
import { useState } from "react";
import _ from "lodash";
import "./App.css"

import { Table } from "./Table";
import { Filter } from "./Filter";
import { Pagination } from "./Pagination";
import { Info } from "./Info";

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

  const filteredData = data
    .filter(filter)
    .map((x, i) => ({ ...x, rank: i + 1 }));

  return (
    <div>
      <header>
        <h1>BC Liquor Store browser</h1>
        <p>
          This data was last updated at {metadata.scrapedAt.toLocaleString()}
        </p>
        <Info />
      </header>
      <hr />
      <Filter {...{ filter, setFilter, categories, data }} />
      <hr />
      <Pagination {...{ page, setPage, limit, setLimit, data: filteredData }} />
      <hr />
      <Table data={filteredData.slice(page * limit, (page + 1) * limit)} />
    </div>
  );
}

export default App;
