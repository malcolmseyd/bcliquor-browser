import fs from "node:fs";
import _ from "lodash";

console.log("fetching data...")
const response = await fetch("https://www.bcliquorstores.com/ajax/browse?sort=name.raw:asc&size=10000&page=1");

console.log("getting json...")
const json = await response.json();

console.log("mapping data")
const data = json.hits.hits
	.map((x) => ({
		id: x._id,
		name: x._source.name,
		stock: x._source.availableUnits,
		price: Number.parseFloat(
			x._source.currentPrice ??
			x._source.regularPrice ??
			x._source._regularPrice
		),
		items: x._source.unitSize,
		volume: Number.parseFloat(x._source.volume),
		percent: x._source.alcoholPercentage,
		category: x._source.category.description,
		subCategory: x._source.subCategory.description,
	}))
	.map((x) => ({
		...x,
		millsPerDollar: (x.volume * 1000 * x.items * (x.percent / 100)) / x.price,
	}))
	.sort((a, b) => b.millsPerDollar - a.millsPerDollar);

console.log("making categories")
const categories = _(data)
	.groupBy((x) => x.category)
	.mapValues((x) =>
		_(x)
			.map((x) => x.subCategory)
			.uniq()
	);

const metadata = {
	scrapedAt: new Date().toISOString(),
}

console.log("writing files")
fs.writeFileSync("data.json", JSON.stringify(data));
fs.writeFileSync("categories.json", JSON.stringify(categories));
fs.writeFileSync("metadata.json", JSON.stringify(metadata));

console.log("done")
