import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NAME = "Simple ERC721 Token";
const SYMBOL = "SET";

const SimpleERC721Module = buildModule("SimpleERC721Module", (m) => {
  const name = m.getParameter("name", NAME);
  const symbol = m.getParameter("symbol", SYMBOL);

  const simepleERC721 = m.contract("SimpleERC721", [name, symbol], {});

  m.call(simepleERC721, "mint", [
    "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    "test description",
    "https://test.org",
    "test name",
    "title1,title2",
    "value1,value2",
  ]);

  return { simepleERC721 };
});

export default SimpleERC721Module;
