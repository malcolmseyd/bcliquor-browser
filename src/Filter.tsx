import { includes } from "lodash";
import { useEffect, useState } from "react";
import { Categories } from "./categories";
import { Data } from "./data";

type FilterState = { categories?: string[] };

// despite the type, only one field can be true at once
type FilterUIState = null | { categories?: boolean };

type FilterConfigProps = {
  setFilter: React.Dispatch<React.SetStateAction<(data: Data) => boolean>>;
  categories: Categories;
};

export function Filter({ setFilter, categories }: FilterConfigProps) {
  const [filterState, setFilterState] = useState<FilterState>({
    categories: Object.keys(categories),
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
                  {/* TODO add indented subcategories using s.gif (like HN) */}
                  {category == "Spirits" && <span> {"\t"}</span>}
                  <input
                    type="checkbox"
                    checked={filterState.categories?.includes(category)}
                    onInput={(e) => {
                      if (e.currentTarget.checked) {
                        setFilterState({
                          categories: filterState.categories?.filter(
                            (x) => category !== x
                          ),
                        });
                      } else {
                        setFilterState({
                          categories: filterState.categories?.concat(category),
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
