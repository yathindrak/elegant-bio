import { ConnectKitButton } from "connectkit";
import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

function Home() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect();
  
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
                    <a className="text-primary" href="https://app.ens.domains/" target="_blank">
                      ens.domains
                    </a>{" "}
                    to claim your your domain now.
                  </p>
                </div>
              </div>
              </>
          ) : (
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
          )}
        </>
      )}
    </>
  );
}

export default Home;
