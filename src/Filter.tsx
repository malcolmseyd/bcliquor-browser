import { useEffect, useState } from "react";
import { Categories } from "./categories";
import { Data } from "./data";
import spaceGIF from "./s.gif";

type FilterState = { categories?: string[]; subCategories?: string[] };

// despite the type, only one field can be true at once
type FilterUIState = null | { categories?: boolean };

type FilterConfigProps = {
  setFilter: React.Dispatch<React.SetStateAction<(data: Data) => boolean>>;
  categories: Categories;
};

export function Filter({ setFilter, categories }: FilterConfigProps) {
  const [filterState, setFilterState] = useState<FilterState>({
    categories: Object.keys(categories),
    subCategories: Object.values(categories).flat(),
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
                <>
                  <div>
                    {category == "Spirits" && <span> {"\t"}</span>}
                    <input
                      type="checkbox"
                      checked={filterState.categories?.includes(category)}
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
                            categories:
                              filterState.categories?.concat(category),
                          }));
                        }
                      }}
                    ></input>
                    {category}
                  </div>
                  {filterState.categories?.includes(category) &&
                    categories[category as keyof Categories].map(
                      (subCategory) => (
                        <div>
                          <img src={spaceGIF} width={10} height={1} />
                          <input
                            type="checkbox"
                            checked={filterState.subCategories?.includes(
                              subCategory
                            )}
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
                                    filterState.subCategories?.concat(
                                      subCategory
                                    ),
                                }));
                              }
                            }}
                          ></input>
                          {subCategory}
                        </div>
                      )
                    )}
                </>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
