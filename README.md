### architecture
here is a comparison of the extension-based and iframe-based architecture

metamask extension:
```
dapp inpage.js <-> forwarder contentscript.js <-> extension background.js
ui popup.js <-> extension background.js
```

current metamask iframe:
```
dapp inpage.js <-> iframe background.js
ui app.metamask.io <-> iframe background.js
```


ideal metamask iframe:
```
dapp inpage.js <-> iframe forwarder <-> sharedworker background.js
ui app.metamask.io <-> iframe forwarder <-> sharedworker background.js
```


### example
```
npm start
```