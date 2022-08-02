import _data from "./data.json";
import { Data } from "./data";
import _categories from "./categories";
import { Categories } from "./categories";
import { useState } from "react";
import _ from "lodash";

import { Table } from "./Table";
import { Filter, FilterConfig } from "./FilterUI";

const data = _data as Data[];
const categories = _categories as Categories;

console.log(categories);

function App() {
  const [filter, setFilter] = useState<Filter>({
    categories: Object.keys(categories),
  });

  console.log(filter);

  // const [showCategory, setShowCategory] = useState(false);

  var filteredData = data;
  if (filter.categories) {
    filteredData = filteredData.filter((x) =>
      filter.categories?.includes(x.category)
    );
  }

  return (
    <div>
      <header>
        <h1>BC Liquor Store browser</h1>
      </header>
      <FilterConfig {...{ filter, setFilter, categories }} />
      <hr />
      <Table data={filteredData} />
    </div>
  );
}

export default App;
