<h1>Documentation</h1>
<p>
  This is a overview of some of the main files/technologies at work in
  Project-Alpha. Take note that not all updates to the dev branch will include
  initial dodumentation at release and may need to be made soon after the PR is
  merged. The team will do their best to keep things up to date and correct
  whenever possible.
</p>

<h2>Overview</h2>
<p>
  Project-Alpha is built on traditional MERN technology and takes quite a bit of
  use from the frontend to serve most logic and content. The backend is mainly a
  source of cloud saving but is open for ideas to make the game more feature
  rich. HTML5 Canvas is being used as our 2D drawing system while React.js is
  used for our UI system.
</p>

<h2>Current Project Technologies</h2>
<ul>
  <li>
    <b>Frontend</b>
    <ul>
      <li>HTML5 + Canvas</li>
      <li>CSS3</li>
      <li>JavaScript(ES6+)</li>
      <li>
        <a href="https://vitejs.dev/">Vite React</a>
      </li>
      <li>
        <a href="https://www.npmjs.com/package/react-draggable"
          >React Draggable</a
        >
      </li>
      <li><a href="https://reactrouter.com/en/main">React Router</a></li>
    </ul>
  </li>
  <li>
    <b>Backend</b>
    <ul>
      <li><a href="https://nodejs.org/en">Node.js</a></li>
      <li><a href="https://expressjs.com/">Express.js</a></li>
      <li><a href="https://www.mongodb.com/">MongoDB</a></li>
      <li><a href="https://mongoosejs.com/">Mongoose</a></li>
      <li><a href="https://www.npmjs.com/package/nodemon">Nodemon</a></li>
      <li><a href="https://www.npmjs.com/package/cors">Cors</a></li>
    </ul>
  </li>
</ul>

<h2>Future Goals and Outlook</h2>
<p>
  Project-Alpha is a randomly generated turn-based 2D Roguelike with light
  multiplayer features. The gameplay loop will consist of a floor progression
  system utilizing the core combat system. The player is expected to fight, loot
  and scavange what they can from a randomly generated world in order to survive
  against tougher enemies in upcoming floors. Enemies will have generated and
  scaled inventories to keep the player looking for better gear to get a
  competitive edge. Win conditions won't typically rely on killing all enemies
  but simply finding the exit. If the player deems themselves ready to move
  forward to the next floor, nothing will stop them, but strong enemies will
  attempt to hinder progress ad-infinitum until either the enemy or player is
  killed. When the player's health reaches zero, the player dies and the current
  game is lost. Though, players can accrue a special in-game currency after each
  run, allowing for improved starting gear to be purchased for the next game.
  Shop systems and a out-of-game player stash is planned. As of this time, there
  is no information available regarding questing.
</p>

<h2>File Documentation</h2>
<p>
  This game project isn't using an established game engine. This choice was made
  so devs can have a better idea of how a core HTML Canvas and React game can be
  made. You can see how our major files work
  <a href="./table-of-contents/table-of-contents.md">HERE</a>.
</p>
