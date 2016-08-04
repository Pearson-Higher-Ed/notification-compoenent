# Notification-Component [![Build Status](https://travis-ci.org/Pearson-Higher-Ed/notification-component.svg?branch=master)](https://travis-ci.org/Pearson-Higher-Ed/notification-component)

## Getting Started

```
    npm install 
    npm test //runs the test
    npm run dev //runs the demo
```

## Demo

Running the demo be sure to replace the tokenId inside demo/demo.js

## How do I debug?

Source maps are enabled for the webpack dev server. Using **Chrome dev tools** - open the "Sources" tab, navigate to 
`top/webpack://./`, and you will find the original source files for which you can set breakpoints in Chrome's debugger.

Production source maps are created in the build directory.

To take advantage of source maps, you must enable JavaScript source maps in your browser.

Optionally, install [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
for additional React debugging support in Chrome dev tools under the "React" tab.
