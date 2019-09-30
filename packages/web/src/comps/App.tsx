import ObjectID from "bson-objectid";
import React, { Dispatch, SetStateAction, useState } from "react";

import { generateComb } from "../services/combService";
import { generateGuid } from "../services/guidService";

const copyAndSetValue = (history: string[], setHistory: Dispatch<SetStateAction<string[]>>, value: string) => {
  navigator.clipboard.writeText(value);

  setHistory([value, ...history]);
};

const App: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);

  return (
    <>
      <header>
        <div className="brand">
          <img className="logo" src="popper.svg" alt="Copy Id Logo" />
          <div className="name">Copy Id</div>
        </div>
      </header>
      <main>
        <p>Click a strategy to generate a new value. The value is automatically copied to your clipboard.</p>
        <div className="btn-group">
          <button
            className="btn btn-primary"
            onClick={() => copyAndSetValue(history, setHistory, new ObjectID().toHexString())}
          >
            Object Id (BSON)
          </button>
          <button className="btn btn-primary" onClick={() => copyAndSetValue(history, setHistory, generateGuid())}>
            Random GUID
          </button>
          <button className="btn btn-primary" onClick={() => copyAndSetValue(history, setHistory, generateComb())}>
            Sequential GUID
          </button>
        </div>
        <div>
          {history.map(x => (
            <p key={x}>{x}</p>
          ))}
        </div>
      </main>
      <footer>
        <div>Designed by Richmond Softworks</div>
        <a className="github-link" href="https://github.com/richmondsoftworks/copy-id" target="_blank" rel="noopener">
          <img src="git.svg" alt="git" />
          <span>github</span>
        </a>
      </footer>
    </>
  );
};

export default App;
