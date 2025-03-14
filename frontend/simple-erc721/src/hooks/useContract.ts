import contractAbi from "../../../../backend/artifacts/contracts/SimpleERC721.sol/SimpleERC721.json";
import { useAppKitProvider } from "@reown/appkit/react";
import { useAppKitAccount } from "@reown/appkit/react";
import { SimpleERC721 } from "../../../../backend/typechain-types/contracts/SimpleERC721";
import { BrowserProvider, Contract, formatUnits, Eip1193Provider } from 'ethers'
import { Uint256 } from "web3";

export function useContract(contractAddress:string) {
  const { address, caipAddress, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");

  const getOnChainMetadata = async (tokenId:Uint256): Promise<SimpleERC721.OnChainMetadataStructOutput> => {
    if (!isConnected) throw Error("User disconnected");

    const ethersProvider = new BrowserProvider(walletProvider as Eip1193Provider);
    const signer = await ethersProvider.getSigner();
    
    const SimeERC721Contract = new Contract(contractAddress, contractAbi.abi, signer);
    const onlineMetaData = await SimeERC721Contract.getOnChainMetadata(tokenId);

    return onlineMetaData;
  };
}
