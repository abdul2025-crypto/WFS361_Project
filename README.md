# BC Food Delivery — Clear Code

## Run in VS Code

1. Extract this ZIP.
2. Open the WFS361_Clear_Code folder in VS Code (the folder containing package.json).
3. Install Node.js 22.12 or newer if needed.
4. Open Terminal > New Terminal and run:

```bash
npm install
npm run dev
```

Open the Local URL shown in the terminal. Keep the terminal open.
On Windows you can also double-click START_WINDOWS.bat.
If port 5174 is busy, the app automatically chooses another port.

## Files

- src/App.jsx: navigation, menu, cart state, checkout and order submission.
- src/components/About.jsx: About page based on the supplied reference.
- src/components/MenuItem.jsx: reusable food card.
- src/components/Cart.jsx: order items, quantities and totals.
- src/components/OrderTracking.jsx: simulated order tracking.
- src/data.js: menu items, delivery locations and currency formatting.
- src/App.css: styling and responsive layouts.
- src/assets: local images used by the app.
- Figma.png: supplied design image; this is not an editable Figma file.

The About page uses the existing local food image instead of the chef photo
in the reference. Checkout and order tracking are demonstrations; no payment
or real delivery is processed.

## Build

```bash
npm run build
npm run preview
```

node_modules and Git history are excluded from this download.
