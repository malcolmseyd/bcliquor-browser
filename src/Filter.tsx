import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Categories } from "./json/categories";
import { Data } from "./json/data";
import spaceGIF from "./s.gif";

type FilterState = {
  categories: string[];
  subCategories: string[];
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
    categories: Object.keys(categories),
    subCategories: Object.values(categories).flat(),
    price: {},
    items: {},
    volume: {},
    percent: {},
    stock: { min: 1 },
  });
  const [filterUI, setFilterUI] = useState<FilterUIState | null>(null);

  // every time filterState updates, recompute a new filter function
  useEffect(() => {
    const { categories, subCategories, price, items, volume, percent, stock } =
      filterState;
    setFilter(
      () => (x: Data) =>
        // if any of these expressions evaluate to true, reject the element
        !(
          !categories?.includes(x.category) ||
          !subCategories?.includes(x.subCategory) ||
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
        <button onClick={() => setFilterUI(filterUI === null ? {} : null)}>
          Filter
        </button>
      </div>
      {filterUI !== null && (
        <>
          <div>
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
              <button
                key={key}
                onClick={() => setFilterUI({ [key]: !filterUI[key] })}
              >
                {display}
              </button>
            ))}
          </div>
          {filterUI.categories ? (
            <FilterCategories
              {...{ categories, filterState, setFilterState }}
            />
          ) : filterUI.price ? (
            <FilterPrice {...{ filterState, setFilterState, data }} />
          ) : filterUI.items? (
            <FilterItems{...{ filterState, setFilterState, data }} />
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
  return (
    <>
      {Object.keys(categories).map((category) => (
        <React.Fragment key={category}>
          <div>
            <input
              type="checkbox"
              checked={filterState.categories?.includes(category)}
              readOnly
              onInput={(e) => {
                if (e.currentTarget.checked) {
                  setFilterState((f) => ({
                    ...f,
                    categories: filterState.categories?.filter(
                      (x) => category !== x
                    ),
                  }));
                } else {
                  setFilterState((f) => ({
                    ...f,
                    categories: filterState.categories?.concat(category),
                  }));
                }
              }}
            ></input>
            {category}
          </div>
          {filterState.categories?.includes(category) &&
            categories[category as keyof Categories].map((subCategory) => (
              <div key={category + " " + subCategory}>
                <img src={spaceGIF} width={10} height={1} />
                <input
                  type="checkbox"
                  checked={filterState.subCategories?.includes(subCategory)}
                  readOnly
                  onInput={(e) => {
                    if (e.currentTarget.checked) {
                      setFilterState((f) => ({
                        ...f,
                        subCategories: f.subCategories?.filter(
                          (x) => subCategory !== x
                        ),
                      }));
                    } else {
                      setFilterState((f) => ({
                        ...f,
                        subCategories:
                          filterState.subCategories?.concat(subCategory),
                      }));
                    }
                  }}
                ></input>
                {subCategory}
              </div>
            ))}
        </React.Fragment>
      ))}
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
  defaultMin?: number;
  defaultMax?: number;
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
