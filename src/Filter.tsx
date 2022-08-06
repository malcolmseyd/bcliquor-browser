import _, { clamp } from "lodash";
import React, { useEffect, useState } from "react";
import { Categories } from "./categories";
import { Data } from "./data";
import spaceGIF from "./s.gif";

type FilterState = {
  categories: string[];
  subCategories: string[];
  price: { min?: number; max?: number };
  volume: { min?: number; max?: number };
  percent: { min?: number; max?: number };
};

// despite the type, only one field can be true at once
type FilterUIState = null | {
  categories?: boolean;
  price?: boolean;
  volume?: boolean;
  percent?: boolean;
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
    volume: {},
    percent: {},
  });
  const [filterUI, setFilterUI] = useState<FilterUIState>(null);

  // every time filterState updates, recompute a new filter function
  useEffect(() => {
    setFilter(() => (x: Data) => {
      if (x.stock === 0) {
        return false;
      }
      if (!filterState.categories?.includes(x.category)) {
        return false;
      }
      if (!filterState.subCategories?.includes(x.subCategory)) {
        return false;
      }
      if (filterState.price?.max && filterState.price?.max < x.price) {
        return false;
      }
      if (filterState.price?.min && filterState.price?.min > x.price) {
        return false;
      }
      if (filterState.volume?.max && filterState.volume?.max < x.volume) {
        return false;
      }
      if (filterState.volume?.min && filterState.volume?.min > x.volume) {
        return false;
      }
      if (filterState.percent?.max && filterState.percent?.max < x.percent) {
        return false;
      }
      if (filterState.percent?.min && filterState.percent?.min > x.percent) {
        return false;
      }

      return true;
    });
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
            <button
              onClick={() => setFilterUI({ categories: !filterUI.categories })}
            >
              Category
            </button>
            <button onClick={() => setFilterUI({ price: !filterUI.price })}>
              Price
            </button>
            <button onClick={() => setFilterUI({ volume: !filterUI.volume })}>
              Volume
            </button>
            <button onClick={() => setFilterUI({ percent: !filterUI.percent })}>
              Percent
            </button>
          </div>
          {filterUI.categories ? (
            <FilterCategories
              {...{ categories, filterState, setFilterState }}
            />
          ) : filterUI.price ? (
            <FilterPrice {...{ filterState, setFilterState, data }} />
          ) : filterUI.volume ? (
            <FilterVolume {...{ filterState, setFilterState, data }} />
          ) : filterUI.percent ? (
            <FilterPercent {...{ filterState, setFilterState, data }} />
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

function FilterPrice({ filterState, setFilterState, data }: FilterPriceProps) {
  const minPrice = 0;
  const maxPrice = data.reduce((acc, curr) => Math.max(curr.price, acc), 0);

  return (
    <>
      <div>
        Minimum:
        <input
          type="number"
          value={filterState.price.min ?? 0}
          min={minPrice}
          max={maxPrice}
          onChange={(e) => {
            setFilterState((f) => ({
              ...f,
              price: {
                ...f.price,
                min: _.clamp(e.target.valueAsNumber, minPrice, maxPrice),
              },
            }));
          }}
        ></input>
        / ${maxPrice}
      </div>
      <div>
        Maximum:
        <input
          type="number"
          value={filterState.price.max ?? maxPrice}
          min={minPrice}
          max={maxPrice}
          onChange={(e) => {
            setFilterState((f) => ({
              ...f,
              price: {
                ...f.price,
                max: _.clamp(e.target.valueAsNumber, minPrice, maxPrice),
              },
            }));
          }}
        ></input>
        / ${maxPrice}
      </div>
    </>
  );
}

type FilterVolumeProps = SubFilterProps & { data: Data[] };

function FilterVolume({
  filterState,
  setFilterState,
  data,
}: FilterVolumeProps) {
  const minVolume = 0;
  const maxVolume = data.reduce((acc, curr) => Math.max(curr.volume, acc), 0);

  return (
    <>
      <div>
        Minimum:
        <input
          type="number"
          value={filterState.volume.min ?? 0}
          min={minVolume}
          max={maxVolume}
          onChange={(e) => {
            setFilterState((f) => ({
              ...f,
              volume: {
                ...f.volume,
                min: _.clamp(e.target.valueAsNumber, minVolume, maxVolume),
              },
            }));
          }}
        ></input>
        / {maxVolume} L
      </div>
      <div>
        Maximum:
        <input
          type="number"
          value={filterState.volume.max ?? maxVolume}
          min={minVolume}
          max={maxVolume}
          onChange={(e) => {
            setFilterState((f) => ({
              ...f,
              volume: {
                ...f.volume,
                max: _.clamp(e.target.valueAsNumber, minVolume, maxVolume),
              },
            }));
          }}
        ></input>
        / {maxVolume} L
      </div>
    </>
  );
}

type FilterPercentProps = SubFilterProps;

function FilterPercent({ filterState, setFilterState }: FilterPercentProps) {
  const minPercent = 0;
  const maxPercent = 100;

  return (
    <>
      <div>
        Minimum:
        <input
          type="number"
          value={filterState.percent.min ?? 0}
          min={minPercent}
          max={maxPercent}
          onChange={(e) => {
            setFilterState((f) => ({
              ...f,
              percent: {
                ...f.percent,
                min: _.clamp(e.target.valueAsNumber, minPercent, maxPercent),
              },
            }));
          }}
        ></input>
        / {maxPercent}%
      </div>
      <div>
        Maximum:
        <input
          type="number"
          value={filterState.percent.max ?? maxPercent}
          min={minPercent}
          max={maxPercent}
          onChange={(e) => {
            setFilterState((f) => ({
              ...f,
              percent: {
                ...f.percent,
                max: _.clamp(e.target.valueAsNumber, minPercent, maxPercent),
              },
            }));
          }}
        ></input>
        / {maxPercent}%
      </div>
    </>
  );
}
