import { ConnectKitButton } from "connectkit";
import { ethers } from "ethers";
import { useMemo, useState } from "react";
import {
  useAccount,
  useBalance,
  useConnect,
  useContractRead,
  useEnsName,
  useEnsResolver,
} from "wagmi";
import EnsResolverABI from "./abis/EnsResolver";
import useIPFSFile from "./hooks/useIPFSFile";
// @ts-ignore
import contentHash from "@ensdomains/content-hash";
import { fetchBalance } from "@wagmi/core";

export interface Coin {
  name: string;
  timestamp: string;
  tokens?: TokensEntity[] | undefined;
}

export interface TokensEntity {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
}

function Home() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const nameHash = useMemo(() => {
    if (!ensName) {
      return;
    }
    // "stablecoin.cmc.eth"
    return ethers.utils.namehash("stablecoin.cmc.eth") as `0x${string}`;
  }, [ensName]);

  const { data: ensResolver } = useEnsResolver({
    name: "stablecoin.cmc.eth"!,
  });

  const { data, isError, isLoading } = useContractRead({
    address: ensResolver?.address as `0x${string}`,
    abi: EnsResolverABI,
    functionName: "contenthash",
    args: [nameHash!],
  });

  const [balances, setBalances] = useState<any>();
  const [ethBalance, setEthBalance] = useState<any>();

  const content = useMemo(() => {
    if (!data) {
      return null;
    }

    // content hash is in encoded state, hence decode
    return contentHash.decode(data);
  }, [data]);

  const coin = useIPFSFile<Coin>(content);

  const tokensList = coin?.data?.tokens;

  useMemo(async () => {
    if (!tokensList) {
      return null;
    }

    // const balances: any[] = [];
    const ethBalance = await fetchBalance({
      address: address as `0x${string}`,
    });

    setEthBalance(ethBalance?.formatted);

    console.log(tokensList);
    const balances = await Promise.all(
      [
        {
          chainId: 1,
          address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          symbol: "USDT",
          name: "Tether",
          decimals: 6,
        },
        {
          chainId: 1,
          address: "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359",
          symbol: "SAI",
          name: "Single Collateral DAI",
          decimals: 18,
        },
        {
          chainId: 1,
          address: "0x4f3AfEC4E5a3F2A6a1A411DEF7D7dFe50eE057bF",
          symbol: "DGX",
          name: "Digix Gold Token",
          decimals: 9,
        },
        {
          chainId: 1,
          address: "0x57Ab1E02fEE23774580C119740129eAC7081e9D3",
          symbol: "sUSD",
          name: "sUSD",
          decimals: 18,
        },
        {
          chainId: 1,
          address: "0xdB25f211AB05b1c97D595516F45794528a807ad8",
          symbol: "EURS",
          name: "STASIS EURO",
          decimals: 2,
        },
        {
          chainId: 1,
          address: "0x056Fd409E1d7A124BD7017459dFEa2F387b6d5Cd",
          symbol: "GUSD",
          name: "Gemini Dollar",
          decimals: 2,
        },
        {
          chainId: 1,
          address: "0x8E870D67F660D95d5be530380D0eC0bd388289E1",
          symbol: "PAX",
          name: "Paxos Standard",
          decimals: 18,
        },
        {
          chainId: 1,
          address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          symbol: "USDC",
          name: "USD Coin",
          decimals: 6,
        },
        {
          chainId: 1,
          address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
          symbol: "WBTC",
          name: "Wrapped Bitcoin",
          decimals: 8,
        },
        {
          chainId: 1,
          address: "0xA4Bdb11dc0a2bEC88d24A3aa1E6Bb17201112eBe",
          symbol: "USDS",
          name: "StableUSD",
          decimals: 6,
        },
        {
          chainId: 1,
          address: "0x10c71515602429C19d53011EA7040B87a4894838",
          symbol: "DPT",
          name: "Diamond Platform Token",
          decimals: 18,
        },
        {
          chainId: 1,
          address: "0x8762db106B2c2A0bccB3A80d1Ed41273552616E8",
          symbol: "RSR",
          name: "Reserve Rights",
          decimals: 18,
        },
        {
          chainId: 1,
          address: "0x4954Db6391F4feB5468b6B943D4935353596aEC9",
          symbol: "USDQ",
          name: "USDQ",
          decimals: 18,
        },
        {
          chainId: 1,
          address: "0x1c48f86ae57291F7686349F12601910BD8D470bb",
          symbol: "USDK",
          name: "USDK",
          decimals: 18,
        },
        {
          chainId: 1,
          address: "0xB4272071eCAdd69d933AdcD19cA99fe80664fc08",
          symbol: "XCHF",
          name: "CryptoFranc",
          decimals: 18,
        },
        {
          chainId: 1,
          address: "0xe577e0B200d00eBdecbFc1cd3F7E8E04C70476BE",
          symbol: "xEUR",
          name: "xEURO",
          decimals: 0,
        },
        {
          chainId: 1,
          address: "0xCdCFc0f66c522Fd086A1b725ea3c0Eeb9F9e8814",
          symbol: "AURA",
          name: "Terra",
          decimals: 18,
        },
        {
          chainId: 1,
          address: "0xdF574c24545E5FfEcb9a659c229253D4111d87e1",
          symbol: "HUSD",
          name: "HUSD",
          decimals: 8,
        },
      ].map(async (token) => {
        // console.log(token)
        try {
          if (token?.address !== "0x") {
            const balance = await fetchBalance({
              address: address as `0x${string}`,
              token: token?.address as `0x${string}`,
            });

            console.log(
              "balance for " + balance.symbol + " " + JSON.stringify(balance)
            );

            return balance;
          }
        } catch (error) {
          console.log("error occurred fetching balance");
        }
      })
    );

    console.log("prinitng balances");
    console.log({ balances });
    setBalances(balances);

    // content hash is in encoded state, hence decode
    // return contentHash.decode(data);
  }, [tokensList]);

  return (
    <>
      {!isConnected ? (
        <div className="py-24 flex items-center min-h-screen justify-center bg-white">
          <div className="mx-auto max-w-[43rem]">
            <>
              <div className="flex flex-col items-center text-center">
                <p className="text-lg font-medium leading-8 text-indigo-600/95">
                  Web3 Powered Simple Portfolio Tracker
                </p>
                <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black uppercase">
                  Simple Crypto Portfolio Tracker
                </h1>
                <p className="mt-3 text-lg leading-relaxed text-slate-400 mb-10">
                  Track your crypto investments with ease on the decentralized
                  web!
                </p>
                <ConnectKitButton />
              </div>
              {/* <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={() => connect()}
                  className="transform rounded-md bg-indigo-600/95 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  Connect Wallet
                </button>
              </div> */}
            </>
          </div>
        </div>
      ) : (
        <>
          {!ensName ? (
            <>
              <ConnectKitButton />
              <div className="py-24 flex items-center min-h-screen justify-center bg-white">
                <div className="mx-auto max-w-[43rem] text-center">
                  <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black uppercase">
                    No ENS Record Found
                  </h1>
                  <p className="mt-3 text-lg leading-relaxed text-slate-400">
                    Visit{" "}
                    <a
                      className="text-primary"
                      href="https://app.ens.domains/"
                      target="_blank"
                    >
                      ens.domains
                    </a>{" "}
                    to claim your your domain now.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <ConnectKitButton />
              <div className="py-24 flex items-center bg-white">
                <div className="mx-auto max-w-[43rem] text-center">
                  <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black uppercase">
                    Your Portfolio
                  </h1>
                  <p className="mt-3 text-lg leading-relaxed text-slate-400">
                    ENS: {ensName}
                  </p>

                  {balances && (
                    <div className="flex flex-col mt-10">
                      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="overflow-hidden">
                            <table className="min-w-full">
                              <thead className="bg-white border-b">
                                <tr>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                                  >
                                    Token
                                  </th>
                                  <th
                                    scope="col"
                                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                                  >
                                    Value
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-gray-100 border-b">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    ETH
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {ethBalance}
                                  </td>
                                </tr>
                                {balances.map((balance: any) => {
                                  if (balance) {
                                    return (
                                      <tr className="bg-gray-100 border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          {balance?.symbol}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          {balance?.formatted}
                                        </td>
                                      </tr>
                                    );
                                  }
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Home;
