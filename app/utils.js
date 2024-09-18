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

textarea {
  display: block;
  width: 100%;
  font: 16px sans-serif;
  margin-bottom: 5px;
  padding: 6px;
}

button {
  cursor: pointer;
  display: inline-block; 
  margin: 2px 0;
  padding: 6px 18px;
  font-size: 17px;
  background: #059862;
  border-radius: 5px;
  border: 0;
  color: #fff;
}

.warning {
  border: 2px dotted maroon;
  border-radius: 3px;
  padding: 6px;
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
<h1 style="margin-bottom: 5px;">Poof messages</h1>
<h2 style="margin-top: 0px;">Make &amp; share one-time-view-only secret messages</h2>

<form method="POST" action="${config.basePath}">

<label for="poof">Your secret message</label>
<textarea name="poof" id="poof" rows="5" required></textarea>

<button>Create poof message</button>

</form>

<div style="margin: 20px 0">
  <a href="https://github.com/aktsbot/poof">See source code</a>
</div>

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
<div class="warning">
<h2 style="margin: 0;">Warning: This is a poof message</h2>
<p>After you view this message, it's gone forever.</p>
<a href="?view=1">I understand</a>
</div>
`;
    } else {
      if (poof) {
        html += `
<label for="poof">Your secret message</label>
<textarea id="poof" rows="5" readonly>${poof}</textarea>
`;
      } else {
        html += `
<h2>Uh oh! Poof message not found</h2>
<p>It might have been already viewed. Please ask who ever sent you this link to create a new one.</p>
`;
      }
    }

    if (!showWarning) {
      html += `<div><a href="${config.basePath}">Make a new message?</a></div>`;
    }
    html += `${templates.tail}`;
    return html;
  },
};

export const makePoofId = () => crypto.randomBytes(3).toString("hex");
