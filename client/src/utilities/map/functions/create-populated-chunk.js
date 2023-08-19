import { applyRange as randomizeBlock } from "../../general/functions/utilityFunctions";
import createBlankChunk from "./create-blank-chunk";
import { createChain, createSpoke, createWeb } from "./algos";

const generatePopulatedChunk = (engine = "random", size = 10) => {
  const chunkParams = createBlankChunk(size);
  const chunkOptions = {
    chain: () => {
      console.log("chain algo");
      createChain(chunkParams);
    },
    spoke: () => {
      console.log("spoke algo");
      createSpoke(chunkParams);
    },
    web: () => {
      console.log("web algo");
      createWeb(chunkParams);
    },
    // random always needs to be last in the options
    random: () => {
      const optionKeys = Object.keys(chunkOptions);
      const choice = randomizeBlock(0, optionKeys.length - 1);
      chunkOptions[optionKeys[choice]]();
    },
  };
  const chunkFunction = chunkOptions[engine];
  chunkFunction();
  return chunkParams.newChunk;
};

export default generatePopulatedChunk;
