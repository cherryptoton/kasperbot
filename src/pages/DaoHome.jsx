import React from "react";
import { Link } from "react-router-dom";

// (Components)
import Navbar from "../components/Navbar";
import Spacer from "../components/Spacer";

const DaoHomePage = () => {
  return (
    <main className="home-page home-background w-full h-[100dvh] flex flex-col gap-y-10">
      <header>
        <div className="gradient_anyone p-3 text-center">
          <p>
            The material provided is not, in any circumstance, financial or
            investment advice, and is for general information only.
          </p>
        </div>
        <Navbar />
      </header>

      {/* CHOOSE CONNECT OPTION */}
      <section className="w-full min-w-full max-w-full pb-6">
        <Spacer>
          <div className="w-full max-w-3xl mx-auto py-6 px-10 shadow-sm bg-white/30 border border-white/70 rounded-2xl flex flex-row items-center gap-x-3 gap-y-4">
            <div className="w-full text-center flex flex-col gap-y-3">
              <h3 className="text-3xl font-semibold">Anyone Token Claim</h3>
              <p>
                The ANyONe token claim represents a material token upgrade and
                is subject to qualifying participants following our claim and
                general terms
              </p>

              <div className="flex flex-col gap-6 justify-center items-center">
                <div className="bg-white w-[300px] rounded-xl py-3 px-3 flex flex-col gap-y-2 shadow-sm">
                  <div>
                    <h4 className="text-sm opacity-80 text-start">
                      Existing Balance
                    </h4>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div>
                      <h4 className="text-lg text-start">0</h4>
                    </div>
                    <div>
                      <button className="gradient_anyone py-1 px-2 text-white text-xs rounded-full">
                        Max
                      </button>
                    </div>
                  </div>
                </div>

                <Link to={`/wallets`}>
                  <button className="gradient_anyone text-primary font-medium border rounded-full flex gap-1 justify-center items-center py-3 px-6">
                    <span>Connect Wallet</span>
                  </button>
                </Link>

                <button
                  disabled
                  className="bg-white/60 cursor-not-allowed border-[#36bbc451] text-[#36BAC4] font-medium border rounded-full flex gap-1 justify-center items-center py-3 px-6"
                >
                  <span>Legal terms</span>
                </button>
              </div>
            </div>
          </div>
        </Spacer>
      </section>
    </main>
  );
};

export default DaoHomePage;
