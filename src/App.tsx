import _data from "./data.json";
import { Data } from "./data";
import _categories from "./categories";
import { Categories } from "./categories";
import { useState } from "react";
import _ from "lodash";

const productURL = "https://www.bcliquorstores.com/product/";

const data = _data as Data[];
const categories = _categories as Categories;

console.log(categories);

type Filter = { categories?: string[] };

type FilterUI = null | { categories?: boolean };
// type FilterUI = { categories: false | {[Property in keyof Categories]: string}};

function App() {
  const [filter, setFilter] = useState<Filter>({
    categories: Object.keys(categories),
  });
  const [filterUI, setFilterUI] = useState<FilterUI>(null);

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
      <div>
        <div>
          <button onClick={() => setFilterUI(filterUI === null ? {} : null)}>
            Filter
          </button>
        </div>
        {filterUI !== null && (
          <>
            <div>
              <button
                onClick={() =>
                  setFilterUI({ ...filterUI, categories: !filterUI.categories })
                }
              >
                Category
              </button>
            </div>
            {filterUI.categories && (
              <div>
                {Object.keys(categories).map((category) => (
                  <div>
                    <input
                      type="checkbox"
                      checked={filter.categories?.includes(category)}
                      onInput={(e) => {
                        if (e.currentTarget.checked) {
                          setFilter({
                            categories: filter.categories?.filter(
                              (x) => category !== x
                            ),
                          });
                        } else {
                          setFilter({
                            categories: filter.categories?.concat(category),
                          });
                        }
                      }}
                    ></input>
                    {category}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <hr />
      <table>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Rank</th>
            <th>Name</th>
            <th>Price</th>
            <th>Volume</th>
            <th>Percent</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Cost-Effectiveness</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(
            (
              {
                id,
                name,
                price,
                volume,
                percent,
                category,
                subCategory,
                millsPerDollar,
              },
              i
            ) => (
              <tr key={id}>
                {/* <td>{id}</td> */}
                <td>{i + 1}</td>
                <td>
                  <a href={productURL + id}>{name}</a>
                </td>
                <td>${price}</td>
                <td>{volume} L</td>
                <td>{percent}% </td>
                <td>{category}</td>
                <td>{subCategory}</td>
                <td>{millsPerDollar.toFixed(3)} mL/$</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
