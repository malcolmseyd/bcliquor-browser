import fs from "node:fs";
import _ from "lodash";

const rawData = fs.readFileSync("rawData.json");

console.log("decoding text")
const rawDataText = new TextDecoder("utf-8").decode(rawData)

console.log("mapping data")
const data = JSON.parse(rawDataText).hits.hits
	.map((x) => ({
		id: x._id,
		name: x._source.name,
		stock: x._source.availableUnits,
		price: Number.parseFloat(x._source.regularPrice),
		volume: Number.parseFloat(x._source.volume),
		percent: x._source.alcoholPercentage,
		category: x._source.category.description,
		subCategory: x._source.subCategory.description,
	}))
	.map((x) => ({
		...x,
		millsPerDollar: (x.volume * 1000 * (x.percent / 100)) / x.price,
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

console.log("writing files")
fs.writeFileSync("data.json", JSON.stringify(data));
fs.writeFileSync("categories.json", JSON.stringify(categories));

console.log("done")