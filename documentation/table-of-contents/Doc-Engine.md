# Engine.jsx

Welcome to the root of the project! Everything that makes Project-Alpha tick is routed through this file. This file is host to the [GameCore.jsx](./Doc-GameCore.md) file which is used to import most core systems in the game. There is a lot going on in this file which will be broken down into categories to better understand the role and order of everything inside.

The flow of this file is as follows:

#### [**Hooks**](#hooks) _->_ [**useEffect()**](#useeffect) _->_ [**Canvas**](#canvas) _->_ [**setupOnLoad()**](#setuponload) _->_ [**update()**](#update)

## Custom Hooks

Custom hooks are used to abstract state and hold internal functionality for setting up various game components. Most of these hooks rely on another being loaded before they can function correctly. Order **does** matter. The map needs to be created before the player can be made as it would be impossible to find a spawn point with a non-existant map.

Shown here:

```javascript
// Creation of the map
const map = useMap(1, 1);
// Creation of player and using open map spaces for spawning
const [player, setPlayer] = usePlayer(map.openSpace);
```

Once the map is generated, it can send the available spawn locations into the player hook.

Every hook that is created and used is meant to _prepare_ the game for the user. Here are a few functions of the game's custom hooks:

- Generating random enemies
- Setting up the player
- Constructing a new map
- Adding key control listeners

These are all examples of logic that must be constructed before the game can truly start.

Custom hooks are typically the result of needing abstracted logic outside of a JSX component. They can be used outside Engine.jsx and can also be used in Core Module files. See [GameCore](./Doc-GameCore.md) for more information.

## useEffect()

Currently, there are two useEffects. The first useEffect is ran once directly after Engine.jsx mounts. It sets up the canvas element and extracts the context system we need which is filled with various methods and properties used to add, remove and move the various Instances accross the canvas system.

### NOTE: _Make sure nothing is in the first useEffect dependency array. React handles state changes and the Instance system controls the canvas. Filling in this dependency array takes the control away from the Instances which is not ideal._

The second useEffect adds event listeners to listen for screen resolution changes. This is good for debug purposes in the browser but may be removed for production. _Take note that for every pixel that the canvas is resized, a rerender is forced._

## Canvas

The root of everything visual (non-text) is displayed and manipulated through HTML5's canvas context system. Since React loves to rerender on state change (and a game typically has tons of state changes), it is required that the canvas is bound to a reference to keep the frames in sync at all times.

## setupOnLoad()

This function is called before the frame loop (update) starts in the useEffect. It runs once to setup any level post-load criteria that must be fulfilled before gameplay can start.

Ideally, anything placed inside setupOnLoad should come with an onLoad() method like so:

```javascript
// Move map tiles based on player spawn offset
map.onLoad(playerPosOffset);
// Migrate enemies based on player spawn offset
enemies.forEach((enemy) => enemy.onLoad(playerPosOffset));
// Migrate player to canvas center
player.onLoad(canvasRef.current);
```

This way it's easy to find the relevance when adding or removing onLoad features.

setupOnLoad is bound behind the isLevelSetup boolean state. Once it's finished loading, isLevelSetup turns to true and doesn't run again.

```javascript
// Setting up level onload state
const [isLevelSetup, setIsLevelSetup] = useState(false);
```

## update()

The update function is called inside the useEffect to render the game in a frame-by-frame format. Since React only calls useEffect once with an empty dependency array, it's required to call a special function to start the loop in the background.

```javascript
requestAnimationFrame(update);
```

Once this function is called and the update function reference is passed in, it runs the update function _60 times a second_. Whatever functions one puts inside update **must be performance conscious**. Anything needing to be _updated_ per frame is placed inside this function.

An example of something that needs to be updated per frame is player movement and canvas bounds checking:

```javascript
// Player is rendered and sends in collision Instances to check per frame
player.instance.render(ctx, map.walls, canvas);
// Player is checked against the bounds of the canvas for fluid map movement
player.instance.checkBoundsCollision(canvas, 500);
```

### NOTE: _Do not remove the useEffects return statement. If this is removed then we can created hundreds of requestAnimationFrame loops simultaneously._

## Global Context

Engine.jsx is the host of all the various global values used throughout the /game route. Most of these are created from custom hooks. However, some may come from other origins like the canvas ref. The current available values are:

```javascript
{
    canvas: canvasRef.current, // Canvas object
    map, // Map Class
    keyObj, // Key Object
    player, // Player Class
    setPlayer, // Player State Setter
    enemies, // Enemy Class Array
    setEnemies, // Enemies Array State Setter
    combatEnemy, // Current Enemy In Combat
    setCombatEnemy, // Combat Enemy State Setter
}
```

Access any of these by importing useContext() from react and the globalContext variable. Simply deconstruct whatever accessible value is targeted, like so:

```javascript
import { useContext } from "react";
// /\ Top Imports
// \/ Inside component/hook function body
const { player } = useContext(globalContext);
```

## Files Used

### Hooks

- [useMap()]()
- [usePlayer()]()
- [useEnemies()]()
- [useCombat()]()
- [useControlEvents()]()
- [useMovementHandler()]()

### Components

- [GameCore.jsx](./Doc-GameCore.md)

### [Table Of Contents](./table-of-contents.md)
