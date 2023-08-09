import { generateSpokeMap } from "../../utilities/map/map-logic";
import { Row, TileWall, TileGrass } from "./MapCSS";
const MapGenerator = (props) => {
    const { size } = props;
    const randomMap = generateSpokeMap(size);
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
