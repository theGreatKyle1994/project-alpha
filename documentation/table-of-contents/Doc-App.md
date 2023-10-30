# App.jsx

Our App.jsx route file is like any other one. Here, we assign various routes using custom components.

## Current Routes

|       Route       |                Purpose                 |
| :---------------: | :------------------------------------: |
|       /game       |         launches the main game         |
|      /login       |         login/reg test system          |
| /entity (testing) |  various entity value/method testing   |
| /canvas (testing) | 2D canvas instance testing environment |

_Any routes are subject to change. Feel free to create a testing route and component to isolate the testing environment._

Here is an example of a route using a custom component:

```jsx
import MyComponent from "./components/MyComponent";
// /\ Top imports
// \/ In App function return statement
<Routes>
  <Route path="/myRoute" element={<MyComponent />} />
</Routes>
```

### [Table Of Contents](./table-of-contents.md)
