import { useState } from "react";
import { Categories } from "./categories";

export type Filter = { categories?: string[] };

type FilterUI = null | { categories?: boolean };
// type FilterUI = { categories: false | {[Property in keyof Categories]: string}};

type FilterConfigProps = {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  categories: Categories;
};

export function FilterConfig({
  filter,
  setFilter,
  categories,
}: FilterConfigProps) {
  const [filterUI, setFilterUI] = useState<FilterUI>(null);

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
  );
}
