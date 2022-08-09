# BCLiquor Browser

Live website here: https://bcliquor.pages.dev

This is a website for viewing BC Liquor's entire catalog as a table, sorted by mL of alcohol per dollar. The table has various filters for narrowing down what you're looking for. Data is updated once per day.

This project has cost me $0, since I host it for free on Cloudflare Pages and new data is fetched using GitHub actions. Even on a private repo, my free minutes per month are more than enough.

## Development

First, install the required packages:

```console
$ bun install
```

Then, get some test data and run the development server

```console
$ bun run generate
$ bun run start
```

Open http://localhost:3000 with your browser to see the result.

## Building and Deploying

This repo uses parcel to build. The following commands with update the data and build the page:

```console
$ bun run generate
$ bun run build
```

You can then serve the files from the `dist/` folder.

This repo uses a GitHub action to rebuild the repo every day, where the build files are output to the `build` branch. Cloudflare Pages then deploys any new commits to the `build` branch immediately. This keeps the data fresh, as anyone using the site will have data from within the last 24 hours.