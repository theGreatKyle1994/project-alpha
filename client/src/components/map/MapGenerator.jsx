import generateNewMap from "../../utilities/map/map-logic";
import { Row, TileWall, TileGrass } from "./MapCSS";
const MapGenerator = (props) => {
  const { size } = props;
  // generate a map based on three different algos: web, chain, or spoke
  const randomMap = generateNewMap("chain", size);
  return (
    <>
      {randomMap.map((row, rIndex) => {
        return (
          <Row key={rIndex}>
            {row.map((tile, cIndex) => {
              if (tile === 2) {
                return <TileGrass key={`r${cIndex}`} />;
              } else {
                return <TileWall key={`r${cIndex}`} />;
              }
            })}
          </Row>
        );
      })}
    </>
  );
};

export default MapGenerator;
