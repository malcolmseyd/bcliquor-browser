import { Categories } from "./json/categories";
import { Data } from "./json/data";
import spaceGIF from "./assets/s.gif";
import closedSVG from "./assets/closed.svg";
import openSVG from "./assets/open.svg";

import React, { useEffect, useState } from "react";
import _ from "lodash";

type FilterState = {
  categories: Partial<Categories>;
  price: { min?: number; max?: number };
  items: { min?: number; max?: number };
  volume: { min?: number; max?: number };
  percent: { min?: number; max?: number };
  stock: { min?: number; max?: number };
};

// despite the type, only one field can be true at once
type FilterUIState = {
  categories?: boolean;
  price?: boolean;
  items?: boolean;
  volume?: boolean;
  percent?: boolean;
  stock?: boolean;
};

type FilterConfigProps = {
  setFilter: React.Dispatch<React.SetStateAction<(data: Data) => boolean>>;
  categories: Categories;
  data: Data[];
};

export function Filter({ setFilter, categories, data }: FilterConfigProps) {
  const [filterState, setFilterState] = useState<FilterState>({
    categories,
    price: {},
    items: {},
    volume: {},
    percent: {},
    stock: { min: 1 },
  });
  const [filterUI, setFilterUI] = useState<FilterUIState | null>(null);

  // every time filterState updates, recompute a new filter function
  useEffect(() => {
    const { categories, price, items, volume, percent, stock } = filterState;
    const categoryKeys = Object.keys(categories);

    setFilter(
      // THIS FUNCTION IS VERY PERFORMANCE SENSITIVE, IT RUNS O(n) ON THE TABLE
      () => (x: Data) =>
        // if any of these expressions evaluate to true, reject the element
        !(
          !(
            categoryKeys.includes(x.category) &&
            categories[x.category]?.includes(x.subCategory)
          ) ||
          // price
          (price?.max !== undefined && price?.max < x.price) ||
          (price?.min !== undefined && price?.min > x.price) ||
          // items
          (items?.max !== undefined && items?.max < x.items) ||
          (items?.min !== undefined && items?.min > x.items) ||
          // volume
          (volume?.max !== undefined && volume?.max < x.volume) ||
          (volume?.min !== undefined && volume?.min > x.volume) ||
          // percent
          (percent?.max !== undefined && percent?.max < x.percent) ||
          (percent?.min !== undefined && percent?.min > x.percent) ||
          // stock
          (stock?.max !== undefined && stock?.max < x.stock) ||
          (stock?.min !== undefined && stock?.min > x.stock)
        )
    );
  }, [filterState]);

  return (
    <div>
      <div>
        <button
          className="button"
          onClick={() =>
            setFilterUI(filterUI === null ? { categories: true } : null)
          }
        >
          <span className="icon-text">
            <span className="icon">
              <img src={filterUI !== null ? openSVG : closedSVG}></img>
            </span>
            <span>Filters...</span>
          </span>
        </button>
      </div>
      {filterUI !== null && (
        <>
          <div className="tabs is-toggle is-fullwidth">
            <ul>
              {(
                [
                  ["Category", "categories"],
                  ["Price", "price"],
                  ["Items", "items"],
                  ["Volume", "volume"],
                  ["Percent", "percent"],
                  ["Stock", "stock"],
                ] as [string, keyof FilterUIState][]
              ).map(([display, key]) => (
                <li
                  className={
                    "is-clickable" + (filterUI[key] ? " is-active" : "")
                  }
                  key={key}
                  onClick={() => setFilterUI({ [key]: true })}
                >
                  <a>{display}</a>
                </li>
              ))}
            </ul>
          </div>
          {filterUI.categories ? (
            <FilterCategories
              {...{ categories, filterState, setFilterState }}
            />
          ) : filterUI.price ? (
            <FilterPrice {...{ filterState, setFilterState, data }} />
          ) : filterUI.items ? (
            <FilterItems {...{ filterState, setFilterState, data }} />
          ) : filterUI.volume ? (
            <FilterVolume {...{ filterState, setFilterState, data }} />
          ) : filterUI.percent ? (
            <FilterPercent {...{ filterState, setFilterState, data }} />
          ) : filterUI.stock ? (
            <FilterStock {...{ filterState, setFilterState, data }} />
          ) : null}
        </>
      )}
    </div>
  );
}

type SubFilterProps = {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
};

type FilterCategoriesProps = SubFilterProps & { categories: Categories };

function FilterCategories({
  categories,
  filterState,
  setFilterState,
}: FilterCategoriesProps) {
  const categoryKeys = Object.keys(categories) as (keyof Categories)[];
  return (
    <>
      <div className="block">
        <button
          onClick={() =>
            setFilterState((f) => ({
              ...f,
              categories: _.mapValues(f.categories, (v, k) =>
                v === undefined ? undefined : categories[k as keyof Categories]
              ),
            }))
          }
        >
          Select all
        </button>
        <button
          onClick={() =>
            setFilterState((f) => ({
              ...f,
              categories: _.mapValues(f.categories, (v) =>
                v === undefined ? undefined : []
              ),
            }))
          }
        >
          De-select all
        </button>
      </div>
      <div className="columns block">
        {categoryKeys.map((category) => (
          <div className="column" key={category}>
            <div>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={filterState.categories[category] !== undefined}
                  readOnly
                  onInput={(e) => {
                    const checked = e.currentTarget.checked;
                    setFilterState((f) => ({
                      ...f,
                      categories: {
                        ...filterState.categories,
                        [category]: checked ? undefined : categories[category],
                      },
                    }));
                  }}
                ></input>
                {" " + category}
              </label>
            </div>
            {filterState.categories[category] !== undefined &&
              categories[category].map((subCategory) => (
                <div
                  key={category + " " + subCategory}
                  style={{ marginLeft: 10 }}
                >
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={filterState.categories[category]?.includes(
                        subCategory
                      )}
                      readOnly
                      onInput={(e) => {
                        const checked = e.currentTarget.checked;
                        setFilterState((f) => ({
                          ...f,
                          categories: {
                            ...f.categories,
                            [category]: checked
                              ? f.categories[category]?.filter(
                                  (x) => subCategory !== x
                                )
                              : filterState.categories[category]?.concat(
                                  subCategory
                                ),
                          },
                        }));
                      }}
                    ></input>
                    {" " + subCategory}
                  </label>
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}

type FilterPriceProps = SubFilterProps & { data: Data[] };

function FilterPrice(props: FilterPriceProps) {
  const { data } = props;
  return NumberFilter({
    min: 0,
    max: data.reduce((acc, curr) => Math.max(curr.price, acc), 0),
    key: "price",
    format: (x) => "$" + x,
  })(props);
}

type FilterItemProps = SubFilterProps & { data: Data[] };

function FilterItems(props: FilterItemProps) {
  const { data } = props;
  return NumberFilter({
    min: 0,
    max: data.reduce((acc, curr) => Math.max(curr.items, acc), 0),
    key: "items",
    format: (x) => x.toString(),
  })(props);
}

type FilterVolumeProps = SubFilterProps & { data: Data[] };

function FilterVolume(props: FilterVolumeProps) {
  const { data } = props;
  return NumberFilter({
    min: 0,
    max: data.reduce((acc, curr) => Math.max(curr.volume, acc), 0),
    key: "volume",
    format: (x) => x + " L",
  })(props);
}

type FilterPercentProps = SubFilterProps;

function FilterPercent(props: FilterPercentProps) {
  return NumberFilter({
    min: 0,
    max: 100,
    key: "percent",
    format: (x) => x + "%",
  })(props);
}

type FilterStockProps = SubFilterProps & { data: Data[] };

function FilterStock(props: FilterStockProps) {
  const { data } = props;
  return NumberFilter({
    min: 0,
    max: data.reduce((acc, curr) => Math.max(curr.stock, acc), 0),
    key: "stock",
    format: (x) => x.toString(),
  })(props);
}

type NumberFilterParams = {
  min: number;
  max: number;
  key: keyof FilterUIState;
  format: (x: number) => string;
};

function NumberFilter({ min, max, key, format }: NumberFilterParams) {
  return ({ filterState, setFilterState }: SubFilterProps) => {
    const value = filterState[key] as { min?: number; max?: number };
    return (
      <>
        <div>
          Minimum:
          <input
            type="number"
            value={value.min ?? min}
            min={min}
            max={max}
            onChange={(e) => {
              setFilterState((f) => ({
                ...f,
                [key]: {
                  ...f[key],
                  min: _.clamp(e.target.valueAsNumber, min, max),
                },
              }));
            }}
          ></input>
          / {format(max)}
        </div>
        <div>
          Maximum:
          <input
            type="number"
            value={value.max ?? max}
            min={min}
            max={max}
            onChange={(e) => {
              setFilterState((f) => ({
                ...f,
                [key]: {
                  ...f[key],
                  max: _.clamp(e.target.valueAsNumber, min, max),
                },
              }));
            }}
          ></input>
          / {format(max)}
        </div>
      </>
    );
  };
}
