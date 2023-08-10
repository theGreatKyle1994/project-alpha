import styled from "styled-components";

const Row = styled.div`
  display: flex;
`;
const TileGrass = styled.div`
  background: green;
  width: 25px;
  height: 25px;
`;

const TileWall = styled.div`
  background: brown;
  width: 25px;
  height: 25px;
`;

export { Row, TileGrass, TileWall };
