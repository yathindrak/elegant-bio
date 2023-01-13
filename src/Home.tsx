import { ConnectKitButton } from "connectkit";
import { ethers } from "ethers";
import { useMemo } from "react";
import {
  useAccount,
  useConnect,
  useContractRead,
  useEnsName,
  useEnsResolver,
} from "wagmi";
import EnsResolverABI from "./abis/EnsResolver";
import useIPFSFile from "./hooks/useIPFSFile";
// @ts-ignore
import contentHash from "@ensdomains/content-hash";

function Home() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const nameHash = useMemo(() => {
    if (!ensName) {
      return;
    }
    // "stablecoin.cmc.eth"
    return ethers.utils.namehash(ensName) as `0x${string}`;
  }, [ensName]);

  const { data: ensResolver } = useEnsResolver({
    name: ensName!,
  });

  const { data, isError, isLoading } = useContractRead({
    address: ensResolver?.address as `0x${string}`,
    abi: EnsResolverABI,
    functionName: "contenthash",
    args: [nameHash!],
  });

  const content = useMemo(() => {
    if (!data) {
      return null;
    }

    // content hash is in encoded state, hence decode
    return contentHash.decode(data);
  }, [data]);

  const coin = useIPFSFile(content);

  console.log({ coin });

  return (
    <>
      {!isConnected ? (
        <div className="py-24 flex items-center min-h-screen justify-center bg-white">
          <div className="mx-auto max-w-[43rem]">
            <>
              <div className="flex flex-col items-center text-center">
                <p className="text-lg font-medium leading-8 text-indigo-600/95">
                  Web3 Powered Bio Page
                </p>
                <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black uppercase">
                  Elegant Bio
                </h1>
                <p className="mt-3 text-lg leading-relaxed text-slate-400 mb-10">
                  Elevate your online presence with Elegant Bio - Create and
                  customize your bio link in minutes!
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
              <div className="py-24 flex items-center min-h-screen justify-center bg-white">
                <div className="mx-auto max-w-[43rem] text-center">
                  <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black uppercase">
                    Your Bio Links
                  </h1>
                  <p className="mt-3 text-lg leading-relaxed text-slate-400">
                    {ensName}
                  </p>
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
