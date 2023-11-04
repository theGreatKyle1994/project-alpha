# Table of Contents

Project-Alpha uses 2 major catagories to determine how data is split up and designed: **Instance data** and **Functional data**. Instance data is any code/logic for the Canvas system while Functional data relates to the React system.

## Data Types Examples

**Instance Data**

- Sprites
- Movement
- Particle Effects
- Collision Detection
- Projectiles
- Animations

**Functional Data**

- UI
- Combat Functionality
- Item/Weapon/Enemy Generation
- Various World Logic
- Inventories
- Questing

## Source File

Our source file is indirectly App.jsx. This file is where any routes are defined. The main game, however, launches directly from Engine.jsx. This file drives and branches out into all other functionalities across the application.

## Glossary

**Main Files**

- [App.jsx](./Doc-App.md)
- [Engine.jsx](./Doc-Engine.md)

**Core Files**

- [GameCore.jsx](./core-modules/Doc-GameCore.md)
- [CombatCore.jsx]()
- [UICore.jsx]()

**Custom Hooks**

- [usePlayer.js]()
- [useEnemies.js]()
- [useCombat.js](./custom-hooks/Doc-useCombat.md)
- [useMap.js](./custom-hooks/Doc-useMap.md)
- [useControlEvents.js]()
- [useMovementHandler.js]()
- [useUIEvents.js]()

**Entities**

- [Entity.js]()
- [Item.js]()
- [GameMap.js]()
- [Player.js]()
- [Enemy.js]()
- [Weapon.js]()

**Instances**

- [Instance.js]()
- [PlayerInstance.js]()
- [EnemyInstance.js]()

**Components**

- UI
  - [InventoryMenu.jsx]()

**Utilities**

- Engine

  - [updateInstanceLocation.js]()
  - [assortedMath.js]()

- Combat

  - [playerCombatRouting.js]()
  - [enemyCombatRouting.js]()

- General
  - [utilityFunctions.js]()

### [Documentation](../project-index.md)
