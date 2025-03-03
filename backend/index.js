const { runSQL } = require("./db");
const { gen } = require("./gemini");

const express = require("express");
const app = express();
const port = 3000;

app.get("/chat", (req, res) => {
  try {
    const prompt = req.query.prompt || "";
    if (prompt == "") res.json({ status: 400, text: `Bad Request` });
    else {
      gen(prompt).then((out) => {
        const response = out.response.text();
        const result = splitOutput(response);
        if (result.length > 1) {
          runSQL(result[0]).then((sqlResult) => {
            if (result[1] == "SQL")
              res.json({
                status: 200,
                text: sqlResult
                  .map((obj) =>
                    Object.entries(obj)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join("\n")
                  )
                  .join("\n\n"),
              });
            else res.json({ status: 200, text: result[1] });
          });
        } else res.json({ status: 200, text: result[0] });
      });
    }
  } catch (err) {
    console.log(err.message);
    res.json({ status: 500, text: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const splitOutput = (str) => {
  const lines = str.split("\n");
  if (lines[0].startsWith("@")) {
    return [lines[0].slice(1).trim(), lines.slice(1).join("\n").trim()];
  }
  return [str];
};
