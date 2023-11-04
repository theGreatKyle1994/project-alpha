# useMap()

useMap is a host to the [GameMap]() class. This custom hook is used to generate the layout of a new map for the current level. Maps are not tied to state and must be kept inside of a useRef reference in order to maintain the layout per React rerender.

## Arguments

useMap takes in three arguments:

- width (Number)
- height (Number)
- chunkSize (Number, Optional)

These values are not _per tile_ but rather _per chunk_. Chunks by default are a length of 10. This goes for both width and height. Setting chunkSize will modify the length of chunks.

**The formula for map size is:**

### _size = (width * length) * (height \* length)_

```javascript
useMap(1, 1); // = (1 * 10) * (1 * 10) = 100 tiles
```

```javascript
useMap(4, 4, 5); // = (4 * 5) * (4 * 5) = 400 tiles
```

## Functionality

Only one method is called on the GameMap class inside this hook. The createMap() method which takes in our chunkSize parameter. This method is used to generate and return the entirety of the playable map.

## Returns

This custom hook returns the **GameMap** class derivative.

## Files Used

### Entities

- [GameMap.js]()

### [Table Of Contents](../table-of-contents.md)
