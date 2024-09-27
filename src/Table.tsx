import React from "react";
import { Data } from "./json/data";
import sortSVG from "./assets/sort.svg";
import upSVG from "./assets/up.svg";
import downSVG from "./assets/down.svg";

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
        No results found <span className="is-family-monospace">¯\_(ツ)_/¯</span>
      </h2>
    );
  }

  const SortButton = ({ column, text }: { column: keyof Data; text: string }) =>
    column !== sortState.column ? (
      <span
        className="icon-text is-clickable"
        onClick={() => setSortState({ column, descending: true })}
      >
        <span>{text}</span>
        <span className="icon">
          <img src={sortSVG}></img>
        </span>
      </span>
    ) : (
      <span
        className="icon-text is-clickable has-text-info"
        onClick={() => {
          setSortState({ column, descending: !sortState.descending });
        }}
      >
        <span>{text}</span>
        <span className="icon">
          <img src={sortState.descending ? downSVG : upSVG}></img>
        </span>
      </span>
    );

  return (
    <table className="table is-striped is-narrow is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Rank</th>
          <th>
            <SortButton text="Name" column="name" />
          </th>
          <th>
            <SortButton text="Price" column="price" />
          </th>
          <th>
            <SortButton text="Items" column="items" />
          </th>
          <th>
            <SortButton text="Volume" column="volume" />
          </th>
          <th>
            <SortButton text="Percent" column="percent" />
          </th>
          <th>
            <SortButton text="Category" column="category" />
          </th>
          <th>
            <SortButton text="Subcategory" column="subCategory" />
          </th>
          <th>
            <SortButton text="Stock" column="stock" />
          </th>
          <th>
            <SortButton text="Value" column="value" />
          </th>
          <th>
            <SortButton text="Cost-Effectiveness" column="alcMillsPerDollar" />
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
            value,
            alcMillsPerDollar,
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
              <td>{value.toFixed(2)} $/L</td>
              <td>{alcMillsPerDollar.toFixed(1)} mL(alc)/$</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
