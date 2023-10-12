<h1>Project Alpha</h1>
<p>Welcome to Project Alpha!</p>

<h2>Current Version: v0.1.2</h2>
<h3>UI/Keys Update</h3>
<ul>
    <li>Engine.jsx is the new core file to directly use canvas globally</li>
    <li>Now using react context to prevent the need for prop drilling</li>
    <li>First iteration of the UI system using UICore.jsx</li>
    <li>useControlEvents.js is the new hook root for key listeners and managing key state</li>
    <li>useUIEvents.js is the hook root for checking various keys for menu state toggling</li>
</ul>

<h2>Planned Features</h2>
<ul>
    <li>Map tile system: random gen</li>
    <li>Turn based combat system</li>
    <li>Questing</li>
    <li>Pixel art design</li>
    <li>OOP random gen for weapons/enemies</li>
    <li>Inventory system</li>
    <li>Sound effects/Combat Sounds</li>
</ul>

<h2>Requirements</h2>
<p>This project requires a classic MERN setup to use efficiently.
Make sure MongoDB is installed to make use of the backend tools.
Pulling node_modules is needed to get all required dependencies.
Run this in terminal on both ./client and ./server folders:</p>

<code>npm install</code>

<h1>Getting Started</h1>
<h2>Running the frontend/backend</h2>
<p>To start the frontend, run in terminal at /client:</p>

<code>npm run dev</code>

<p>To start the backend, run in terminal at /server:</p>

<code>nodemon server.js</code>
