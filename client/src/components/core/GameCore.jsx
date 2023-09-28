import Engine from "./engine/Engine";
import Instance from "../../entities/Instance";
import { useState, useEffect } from "react";

const GameCore = () => {
  return (
    <>
      <Engine renderBoxes={renderBoxes} />
    </>
  );
};

export default GameCore;
