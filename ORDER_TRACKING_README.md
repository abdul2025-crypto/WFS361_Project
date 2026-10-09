# Order tracking update

## Run in VS Code

1. Extract this ZIP.
2. Open the WFS361_Pro folder in VS Code.
3. Open Terminal > New Terminal.
4. Run `npm install`.
5. Run `npm run dev` and open the Local URL shown in the terminal.

Use a Node.js version supported by the project's existing Vite dependency.
You can also double-click START_WINDOWS.bat on Windows.

## Try all three screens

Add food to the cart, open Order summary, enter your name and choose a location.
Submit your order to open Preparing. Click "Demo: out for delivery" to see
Out for Delivery, then "Demo: mark delivered" to see Delivered.
The Delivered screen includes Back to menu. Track order in the navigation
reopens your latest order and retains its current stage during this session.
Refreshing the page resets this demo. No live delivery updates are connected.

## Changed files

- src/components/OrderTracking.jsx: reusable tracking page with SVG icons,
  four-step progress line, timestamps and stage messages.
- src/App.jsx: stores the submitted order, opens tracking, and adds navigation.
- src/App.css: responsive tracking styles matching the supplied picture.

The archive omits node_modules, dist and Git history. npm install restores dependencies.
