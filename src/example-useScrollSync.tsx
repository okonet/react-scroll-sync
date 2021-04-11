import React from "react";
import ReactDOM from "react-dom";

import { useElement, useScrollSync } from "react-scroll-sync";

const App = () => {
  const [count, setCount] = React.useState(0);

  const [thead, theadRef] = useElement();
  const [tbody, tbodyRef] = useElement();
  useScrollSync([thead, tbody], { axis: "horizontal" });

  return (
    <article
      css={{ height: "100vh", backgroundColor: "lightblue", padding: 32 }}
    >
      <button onClick={() => setCount((count) => count + 1)}>{count}</button>
      <div
        css={{
          height: 400,
          width: "100%",
          backgroundColor: "white",
          border: "1px solid black",
          borderRadius: "5px",
          overflow: "hidden",
          display: "grid",
          gridTemplateRows: "1fr auto",
        }}
      >
        <div
          role="table"
          css={{
            overflow: "hidden",
            display: "grid",
            gridTemplateRows: "auto 1fr",
          }}
        >
          <div
            ref={theadRef}
            role="rowgroup"
            css={{
              overflowX: "auto",
              overflowY: "hidden",
              /* https://www.w3schools.com/howto/howto_css_hide_scrollbars.asp */
              scrollbarWidth: "none",
            }}
          >
            <div
              role="row"
              css={{
                height: 56,
                backgroundColor: "red",
                display: "inline-flex",
              }}
            >
              {columns.map((col) => (
                <div
                  key={col.key}
                  role="columnheader"
                  css={{ width: col.width }}
                >
                  {col.name}
                </div>
              ))}
            </div>
          </div>
          <div ref={tbodyRef} role="rowgroup" css={{ overflow: "scroll" }}>
            {rows.map((row) => (
              <div
                key={row.a}
                role="row"
                css={{
                  backgroundColor: "blue",
                  display: "inline-flex",
                }}
              >
                {columns.map((col) => (
                  <div key={col.key} role="cell" css={{ width: col.width }}>
                    {row[col.key]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>footer</div>
      </div>
    </article>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// Demo data

const columns = [
  {
    key: "a",
    name: "A is for Alexander",
    width: 64,
  },
  {
    key: "b",
    name: "B is for Brian",
    width: 164,
  },
  {
    key: "c",
    name: 'C is for Claude "Money" Monet',
    width: 64,
  },
  {
    key: "d",
    name: "D is for Derek",
    width: 264,
  },
  {
    key: "e",
    name: "E is for Evan",
    width: 64,
  },
  {
    key: "f",
    name: "F is for Franz Ferdinand",
    width: 64,
  },
  {
    key: "g",
    name: "G is for Gilbert Godfrey",
    width: 64,
  },
  {
    key: "h",
    name: "H is for Howard Hughes",
    width: 64,
  },
] as const;

const generateRow = (rowIndex: number) =>
  Object.fromEntries(
    columns.map((col, columnIndex) => [col.key, rowIndex * 8 + columnIndex])
  );

const rows = Array(100)
  .fill(null)
  .map((_, i) => generateRow(i));
