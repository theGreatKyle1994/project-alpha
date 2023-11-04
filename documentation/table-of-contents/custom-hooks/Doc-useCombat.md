# useCombat()

useCombat manages combat state from a single enemy returned from the [useEnemies()]() custom hook.

## Arguments

This custom hook takes in 2 arguments:

- enemies (Array, Required)
- setEnemies (State Setter, Required)

Both of these arguments should be supplied from the useEnemies() custom hook. As such, useCombat() _must_ be loaded after useEnemies().

## Functionality

The internal state being used by useCombat() is as follows:

```javascript
const [combatEnemy, setCombatEnemy] = useState(null);
```

useCombat contains a reference to the current enemy being fought by the player known as **combatEnemy**. This state can be set externally through the state setter function written as **setCombatEnemy**. The purpose behind this is to update the enemies array by only updating the enemy directly being fought at the time. This is done mainly for performance reasons as updating every enemy simultaneously isn't necessary.

### NOTE: _This file will host direct changes to any instance data involved in the canvas system on enemy death. Examples of this include death sprites and associated animations._

```javascript
// Placeholder until sprites are used
if (combatEnemy.isDead) combatEnemy.instance.color = "grey";
```

If combatEnemy is changed in any way, a useEffect is tripped and begins to loop through the enemies array. It does this to locate the enemy by its internal id and compares this against the current combatEnemy's id. Once located, it calls its associated .copySelf() method to override itself to reflect correctly and prevent desync in the enemies state.

## Returns

useCombat returns its internal combatEnemy and setCombatEnemy states to be used and assigned externally.

### [Table Of Contents](../table-of-contents.md)
