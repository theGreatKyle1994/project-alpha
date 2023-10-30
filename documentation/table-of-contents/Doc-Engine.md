# Engine.jsx

Welcome to the root of our project! Every thing that makes Project-Alpha tick is routed through this file. There is a lot going on in this file, so we will break it into categories to understand the role and order of everything inside.

The flow of this file is as follows:

#### [**Hooks**](#hooks) _->_ [**useEffect()**](#useeffect) _->_ [**Canvas**](#canvas) _->_ [**setupOnLoad()**](#setuponload) _->_ [**update()**](#update)

## Hooks

Custom hooks are used to abstract state and hold internal functionality for setting up various game components. Most of these hooks rely on another being loaded before they can function correctly. Order **does** matter. The map needs to be created before the player can be made as it would be impossible to find a spawn point with a non-existant map.

Shown here:

```javascript
// Creation of the map
const map = useMap(1, 1);
// Creation of player and using open map spaces for spawning
const [player, setPlayer] = usePlayer(map.openSpace);
```

Once the map is generated we can send in the available spawn locations into the player hook.

Every hook we create and use is meant to _prepare_ the game for the user. Here are a few ecamples of what hooks are meant to do:

- Generating random enemies
- Setting up the player
- Constructing a new map
- Adding key control listeners

These are all examples of logic that must be constructed before the game can truly start.

## useEffect()

Currently, we have two useEffects, The first useEffect is ran once after game launch. It directly sets up our canvas element and extracts the context system we need which is filled with various methods and properties used to add, remove and move our Instances accross the canvas system.

### NOTE: _Make sure nothing is in the first useEffect dependency array. We let React handle state changes and our Instance code to control the canvas. Filling in this dependency array takes the control away from our Instances which is not ideal._

The second useEffect adds event listeners to listen for screen resolution changes. This is good for debug purposes in the browser but may be removed for production. _Take note that every pixel that the canvas is resized, forces a rerender._

## Canvas

The root of everything visual (non-text) is displayed and manipulated through HTML5's canvas context system. Since React loves to rerender on state change (and a game typically has tons of state changes), we require our canvas to be bound to a reference to keep our frames in sync at all times.

The canvas ref is global through our context system.

## setupOnLoad()

This function is called before our frame loop (update) starts in our useEffect. It runs once to setup any level post-load criteria that must be fulfilled before gameplay can start.

Ideally, anything you place inside setupOnLoad should come with an onLoad() method like so:

```javascript
// Move map tiles based on player spawn offset
map.onLoad(playerPosOffset);
// Migrate enemies based on player spawn offset
enemies.forEach((enemy) => enemy.onLoad(playerPosOffset));
// Migrate player to canvas center
player.onLoad(canvasRef.current);
```

This way it's easy to find the relevance when adding or removing onLoad features.

## update()

Our update function is called inside our useEffect to render our game in a frame-by-frame format. Since React only calls useEffect once with an empty dependency array, we need to call a special function to start our loop in the background.

```javascript
requestAnimationFrame(update);
```

Once this function is called and we pass in our update function reference, it runs our update function _60 times a second_. Whatever functions you put inside update **must be performance conscious**. Anything you want to _update_ per frame is placed inside this function.

An example of something that needs to be updated per frame is player movement and canvas bounds checking:

```javascript
// Player is rendered and sends in collision Instances to check per frame
player.instance.render(ctx, map.walls, canvas);
// Player s checked against the bounds of the canvas for fluid map movement
player.instance.checkBoundsCollision(canvas, 500);
```

### NOTE: _Do not remove our useEffects return statement. If this is removed then we can created hundreds of requestAnimationFrame loops simultaneously._

### [Table Of Contents](./table-of-contents.md)
