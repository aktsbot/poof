import crypto from "crypto";

import config from "./config.js";

// templates
const templates = {
  head: `
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${config.appName}</title>

  <style>
body {
  margin: 15px auto;
  padding: 0 10px;
  max-width: 650px;
  font-family: sans-serif;
}

* {
  box-sizing: border-box;
}
  </style>
</head>
<body>
`,

  tail: `
</body>

</html>
`,
};

export const pageHtml = {
  home: () => {
    let html = `${templates.head}`;

    html += `
<h1>Poof messages</h1>
<h2>Make &amp; share one-time-view-only secret messages.</h2>

<form method="POST" action="${config.basePath}">

<label for="poof">Your secret message</label>
<textarea name="poof" id="poof" rows="5" required></textarea>

<button>Create poof message</button>

</form>
`;

    html += `${templates.tail}`;
    return html;
  },
  done: ({ fullUrl }) => {
    let html = `${templates.head}`;

    html += `
<h2>Now go ahead and share it!</h2>

<h3><a href="${fullUrl}">${fullUrl}</a></h3>
`;

    html += `${templates.tail}`;
    return html;
  },
  view: ({ poof, showWarning }) => {
    let html = `${templates.head}`;
    if (showWarning) {
      html += `
<div>
<h2>Warning: This is a poof note</h2>
<p>After you view this message, it's gone forever.</p>
<a href="?view=1">I understand</a>
</div>
`;
    } else {
      if (poof) {
        html += `
<label for="poof">Your poof note</label>
<textarea id="poof" readonly>${poof}</textarea>
`;
      } else {
        html += "<h2>Poof note not found</h2>";
      }
    }
    html += `${templates.tail}`;
    return html;
  },
};

export const makePoofId = () => crypto.randomBytes(3).toString("hex");
