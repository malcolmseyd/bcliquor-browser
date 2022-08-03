import { Data } from "./data";
import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtual } from "@tanstack/react-virtual";

const productURL = "https://www.bcliquorstores.com/product/";

const columnHelper = createColumnHelper<Data>();
const columns = [
  columnHelper.accessor("name", {
    cell: (x) => x.getValue(),
    header: () => "Name",
  }),
  columnHelper.accessor("price", {
    cell: (x) => `$${x.getValue()}`,
    header: () => "Price",
  }),
  columnHelper.accessor("volume", {
    cell: (x) => `${x.getValue()} L`,
    header: () => "Volume",
  }),
  columnHelper.accessor("percent", {
    cell: (x) => `${x.getValue()}%`,
    header: () => "Percent",
  }),
  columnHelper.accessor("category", {
    cell: (x) => x.getValue(),
    header: () => "Category",
  }),
  columnHelper.accessor("subCategory", {
    cell: (x) => x.getValue(),
    header: () => "Subcategory",
  }),
  columnHelper.accessor("millsPerDollar", {
    cell: (x) => `${x.getValue().toFixed(3)} mL`,
    header: () => "Cost-Effectiveness",
  }),
];

//       <td>${price}</td>
//       <td>{volume} L</td>
//       <td>{percent}% </td>
//       <td>{category}</td>
//       <td>{subCategory}</td>
//       <td>{millsPerDollar.toFixed(3)} mL/$</td>

// the Table renders the data in a nice tabluar format
function Table({ data }: { data: Data[] }) {
  // const Cell = ({columnIndex, rowIndex, style}) => (
  //   <div style={style}>Item {columnIndex}, {rowIndex}</div>
  // )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                // style={{ width: header.getSize() }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {virtualRows.map((virtualRow) => {
          const row = rows[virtualRow.index];
          if (row === undefined) {
            return null;
          }
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export { Table };
