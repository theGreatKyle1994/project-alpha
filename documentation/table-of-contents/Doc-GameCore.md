# GameCore.jsx

GameCore is host to all core modules that run major core systems within the application. No other component types other than core modules should be placed in GameCore.jsx.

## Core Modules

Core modules drive major functionality within the game. UI, Combat, Questing and Trading features are all examples of major components that would be hosted by a core module.

_Not all core modules are designed or implemented yet but will be updated here once available._

## Defining Core Modules

All core modules _must_ have **Core** at the end of the file name and are always **.jsx** components. Example:

_MyGameFeatureCore.jsx_

A new core module _must_ have the following criteria to be considered:

- Hosts relevant functional components that work off the main core module (children)
- Provide major gameplay logic that doesn't interfere with other core modules
- Expand the games functionality/gameplay loop
- Provide a stateful environment for child components

_Take note that a core module can host it's own personal custom hooks if abstracting state is preferred._

If a core module isn't hosting any JSX components or modules, it may be more appropriate to implement the logic as a custom hook instead in the [Engine.jsx](./Doc-Engine.md) file.

## Files Used

### Components

- [CombatCore.jsx]()
- [UICore.jsx]()

### [Table Of Contents](./table-of-contents.md)
