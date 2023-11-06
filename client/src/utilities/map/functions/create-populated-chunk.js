import { applyRange as randomizeBlock } from "../../general/functions/utilityFunctions";
import createBlankChunk from "./create-blank-chunk";
import { createChain, createSpoke, createWeb } from "./algos";

const generatePopulatedChunk = (engine = "random", size = 10) => {
  const chunkParams = createBlankChunk(size);
  // Chunk options holds all of the available algos to create a chunk sizeXsize.
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
  // whatever algo is passed in through the engine variable gets run through chunkOptions to create a new mapChunk
  chunkOptions[engine]()
  return chunkParams.newChunk;
};

export default generatePopulatedChunk;
