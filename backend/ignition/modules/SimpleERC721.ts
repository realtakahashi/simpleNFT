
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NAME = "Simple ERC721 Token";
const SYMBOL = "SET";

const SimpleERC721Module = buildModule("SimpleERC721Module", (m) => {
  const name = m.getParameter("name", NAME);
  const symbol = m.getParameter("symbol", SYMBOL);

  const simepleERC721 = m.contract("SimpleERC721", [name,symbol], {});

  return { simepleERC721 };
});

export default SimpleERC721Module;
