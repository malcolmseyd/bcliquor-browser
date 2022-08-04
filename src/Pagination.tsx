import React from "react";

type PaginationProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  data: unknown[];
};

export function Pagination({ page, setPage, limit, setLimit, data }: PaginationProps) {
  return (
    <>
      <div>
        <button disabled={page === 0} onClick={() => setPage((x) => 0)}>
          {"<<"}
        </button>
        <button disabled={page === 0} onClick={() => setPage((x) => x - 1)}>
          {"<"}
        </button>
        <span> Page {page + 1} </span>
        <button
          disabled={(page + 1) * limit >= data.length}
          onClick={() => setPage((x) => x + 1)}
        >
          {">"}
        </button>
        <button
          disabled={(page + 1) * limit >= data.length}
          onClick={() => setPage((x) => Math.floor(data.length / limit))}
        >
          {">>"}
        </button>
      </div>
      <div>
        Page size:
        <input
          type="number"
          value={limit}
          onChange={(e) =>
            setLimit(Math.min(Math.max(e.target.valueAsNumber, 0), data.length))
          }
          min={1}
          max={data.length}
        ></input>
        / {data.length}
        {data.length >= 100 && (
          <button onClick={() => setLimit(100)}>100</button>
        )}
        {data.length >= 1000 && (
          <button onClick={() => setLimit(1000)}>1000</button>
        )}
        <button onClick={() => setLimit(data.length)}>all</button>
      </div>
    </>
  );
}
