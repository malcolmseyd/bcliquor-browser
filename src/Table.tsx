import { Data } from "./data";

const productURL = "https://www.bcliquorstores.com/product/";

// the Table renders the data in a nice tabluar format
function Table({
  data,
}: {
  data: Data[];
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Price</th>
          <th>Volume</th>
          <th>Percent</th>
          <th>Category</th>
          <th>Subcategory</th>
          <th>Stock</th>
          <th>Cost-Effectiveness</th>
        </tr>
      </thead>
      <tbody>
        {data
          .map(
            (
              {
                id,
                name,
                rank,
                price,
                volume,
                percent,
                category,
                subCategory,
                stock,
                millsPerDollar,
              },
            ) => (
              <tr key={id}>
                <td>{rank}</td>
                <td>
                  <a href={productURL + id}>{name}</a>
                </td>
                <td>${price}</td>
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

export { Table };
