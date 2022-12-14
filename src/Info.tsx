import { useState } from "react";
import closedSVG from "./assets/closed.svg";
import openSVG from "./assets/open.svg";

export function Info() {
  const [showInfo, setShowInfo] = useState(false);
  const toggleShowInfo = () => setShowInfo((x) => !x);

  return (
    <>
      <button className="button" onClick={toggleShowInfo}>
        <span className="icon-text">
          <span className="icon">
            <img src={showInfo ? openSVG : closedSVG}></img>
          </span>
          <span>About...</span>
        </span>
      </button>
      {showInfo && (
        <article className="message">
          <div className="message-body">
            <div className="block">
              This website download's BC Liquor Store's catalog once per day and
              presents it as this table. You can filter, reorder, and search
              this table, and it aims to be quicker to use and more powerful
              than the official BC Liquor Store website.
            </div>
            <div className="block">
              You can find the source code for this project at{" "}
              <a href="https://github.com/malcolmseyd/bcliquor-browser">
                https://github.com/malcolmseyd/bcliquor-browser
              </a>
              . If you'd like to contribute, feel free to open an issue or a
              pull request!
            </div>
            <div className="block">
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
                  window.location.href =
                    "mailto:" +
                    e.currentTarget.dataset.name +
                    "@" +
                    e.currentTarget.dataset.domain +
                    "." +
                    e.currentTarget.dataset.tld;
                }}
              ></a>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
