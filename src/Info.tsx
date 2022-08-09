import { useState } from "react";

export function Info() {
  const [showInfo, setShowInfo] = useState(false);
  const toggleShowInfo = () => setShowInfo((x) => !x);

  return (
    <>
      <button onClick={toggleShowInfo}>About...</button>
      {showInfo && (
        <div>
          <p>
            This website download's BC Liquor Store's catalog once per day and
            presents it as this table.
          </p>
          <p>
            The <button>Filter</button> button reveals different ways you can
            narrow down what you're looking for. Want to find the best value for
            Vodka under $30? This is where you'll want to go.
          </p>
          <p>
            The <button>Page</button> buttons change the number of items shown
            at once. If your web browser is lagging or slow, try reducing the
            page number to 100. If you want to use your browser's search tool
            (like Ctrl+F), try setting the page size to "all" to see all items
            on one page.
          </p>
          <p>
            You can find the source code for this project at{" "}
            <a href="https://github.com/malcolmseyd/bcliquor-browser">
              https://github.com/malcolmseyd/bcliquor-browser
            </a>
            . If you'd like to contribute, feel free to open an issue or a pull
            request!
          </p>
          <p>
            If you'd like to contact me, send me an email at{" "}
            {/* bot protection: https://stackoverflow.com/a/41566570 */}
            <a
              href="#"
              className="cryptedmail"
              data-name="malcolmseyd"
              data-domain="gmail"
              data-tld="com"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = 'mailto:' + e.currentTarget.dataset.name + '@' + e.currentTarget.dataset.domain + '.' + e.currentTarget.dataset.tld;
              }}
            ></a>
          </p>
        </div>
      )}
    </>
  );
}
