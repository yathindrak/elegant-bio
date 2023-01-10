function Home() {
  return (
    <section className="py-24 flex items-center min-h-screen justify-center bg-white">
      <div className="mx-auto max-w-[43rem]">
        <div className="text-center">
          <p className="text-lg font-medium leading-8 text-indigo-600/95">
            Web3 Powered Bio Page
          </p>
          <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black uppercase">
            Elegant Bio
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-400">
            Elevate your online presence with Elegant Bio - Create and customize your bio link in minutes!
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <a
            href="#"
            className="transform rounded-md bg-indigo-600/95 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Connect Wallet
          </a>
          {/* <a
            href="#"
            className="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-50"
          >
            {" "}
            Request a demo{" "}
          </a> */}
        </div>
      </div>
    </section>
  );
}

export default Home;
