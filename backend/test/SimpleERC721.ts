import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("SimpleERC721", function () {
  async function deploySimpleERC721Fixture() {
    const NAME = "TEST NFT";
    const SYMBOL = "TNT";
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const SimpleERC721 = await hre.ethers.getContractFactory("SimpleERC721");
    const simepleNFT = await SimpleERC721.deploy(NAME, SYMBOL, {});

    return { simepleNFT, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the name & symbol", async function () {
      const { simepleNFT } = await loadFixture(deploySimpleERC721Fixture);

      expect(await simepleNFT.name()).to.equal("TEST NFT");
      expect(await simepleNFT.symbol()).to.equal("TNT");
    });

    it("Should set the right owner", async function () {
      const { simepleNFT, owner } = await loadFixture(
        deploySimpleERC721Fixture
      );

      expect(await simepleNFT.owner()).to.equal(owner.address);
    });
  });
  describe("Mint", function () {
    it("Only owner can mint", async function () {
      const { simepleNFT, owner, otherAccount } = await loadFixture(
        deploySimpleERC721Fixture
      );
      await expect(
        simepleNFT
          .connect(otherAccount)
          .mint(
            owner.getAddress(),
            "Test description",
            "htts://test.com",
            "TestName",
            "ticketKind,right",
            "accomodation,you can stay the domitory for 1 day"
          )
      ).to.be.rejected;

      await simepleNFT
        .connect(owner)
        .mint(
          otherAccount.getAddress(),
          "Test description",
          "htts://test.com",
          "TestName",
          "ticketKind,right",
          "accomodation,you can stay the domitory for 1 day"
        );
      expect(await simepleNFT.ownerOf(0)).to.be.equal(
        await otherAccount.getAddress()
      );
      const metaData = await simepleNFT.getOnChainMetadata(0);
      expect(metaData.description).equal("Test description");
      expect(metaData.external_url).equal("htts://test.com");
      expect(metaData.name).equal("TestName");
      expect(metaData.attribute_name_comma_seprate_string).equal(
        "ticketKind,right"
      );
      expect(metaData.attribute_value_comma_seprate_string).equal(
        "accomodation,you can stay the domitory for 1 day"
      );

      expect(await simepleNFT.tokenURI(0)).to.be.equal(
        "This ERC721 does not have tokenURI."
      );
    });
  });
});
