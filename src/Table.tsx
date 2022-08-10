import { useEffect, useState } from "react";
import { Data } from "./json/data";

const productURL = "https://www.bcliquorstores.com/product/";

type TableProps = {
  data: (Data & { rank: number })[];
  sortState: SortState;
  setSortState: React.Dispatch<React.SetStateAction<SortState>>;
};

export type SortState = {
  column: keyof Data;
  descending: boolean;
};

// the Table renders the data in a nice tabluar format
export function Table({ data, sortState, setSortState }: TableProps) {
  if (data.length === 0) {
    return (
      <h2>
        No results found <code>¯\_(ツ)_/¯</code>
      </h2>
    );
  }

  const SortButton = ({ column }: { column: keyof Data }) =>
    column !== sortState.column ? (
      <button onClick={() => setSortState({ column, descending: true})}>
        {"-"}
      </button>
    ) : (
      <button
        onClick={() => {
          setSortState({ column, descending: !sortState.descending });
        }}
      >
        {sortState.descending ? "▼" : "▲"}
      </button>
    );

  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>
            Name <SortButton column="name" />
          </th>
          <th>
            Price <SortButton column="price" />
          </th>
          <th>
            Items <SortButton column="items" />
          </th>
          <th>
            Volume <SortButton column="volume" />
          </th>
          <th>
            Percent <SortButton column="percent" />
          </th>
          <th>
            Category <SortButton column="category" />
          </th>
          <th>
            Subcategory <SortButton column="subCategory" />
          </th>
          <th>
            Stock <SortButton column="stock" />
          </th>
          <th>
            Cost-Effectiveness <SortButton column="millsPerDollar" />
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(
          ({
            id,
            name,
            rank,
            price,
            items,
            volume,
            percent,
            category,
            subCategory,
            stock,
            millsPerDollar,
          }) => (
            <tr key={id}>
              <td>{rank}</td>
              <td>
                <a href={productURL + id} target="_blank">
                  {name}
                </a>
              </td>
              <td>${price}</td>
              <td>{items}</td>
              <td>{volume} L</td>
              <td>{percent}% </td>
              <td>{category}</td>
              <td>{subCategory}</td>
              <td>{stock}</td>
              <td>{millsPerDollar.toFixed(3)} mL/$</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
