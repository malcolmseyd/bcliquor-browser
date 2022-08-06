import _data from "./data.json";
import { Data } from "./data";
import _categories from "./categories.json";
import { Categories } from "./categories";
import { useState } from "react";
import _ from "lodash";

import { Table } from "./Table";
import { Filter } from "./Filter";
import { Pagination } from "./Pagination";

const data = _data as Data[];
const categories = _categories as Categories;

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
      </header>
      <Filter {...{ filter, setFilter, categories, data }} />
      <hr />
      <Pagination {...{ page, setPage, limit, setLimit, data: filteredData }} />
      <hr />
      <Table data={filteredData.slice(page * limit, (page + 1) * limit)} />
    </div>
  );
}

export default App;
