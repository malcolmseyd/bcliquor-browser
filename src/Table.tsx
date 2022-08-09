import { Data } from "./json/data";

const productURL = "https://www.bcliquorstores.com/product/";

type TableProps = {
  data: (Data & { rank: number })[];
};

// the Table renders the data in a nice tabluar format
export function Table({ data }: TableProps) {
  if (data.length === 0) {
    return (
      <h2>
        No results found <code>¯\_(ツ)_/¯</code>
      </h2>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Price</th>
          <th>Items</th>
          <th>Volume</th>
          <th>Percent</th>
          <th>Category</th>
          <th>Subcategory</th>
          <th>Stock</th>
          <th>Cost-Effectiveness</th>
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
                <a href={productURL + id}>{name}</a>
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
