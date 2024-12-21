import React, { useState } from "react";

// (Data)
import CoinInformation from "../coindata";

// (Components)
import Spacer from "../components/Spacer";
import ConnectionModal from "../components/ConnectionModal";

const WalletPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [clickedInfo, setClickedInfo] = useState({});

  const enableModalHandler = (id) => {
    setIsOpenModal(true);

    CoinInformation.filter((item) => {
      if (item.id === id) {
        return setClickedInfo(item);
      }
      return null;
    });

    return;
  };

  return (
    <>
      {/* // CONNECT WALLET MODAL */}
      {isOpenModal && (
        <ConnectionModal
          setIsOpenModal={setIsOpenModal}
          clickedInfo={clickedInfo}
        />
      )}

      <main className="home-page w-full flex flex-col gap-y-10">
        <section className="w-full min-w-full max-w-full pb-6">
          <Spacer>
            <div className="w-full py-5">
              <div>
                {/* <h2 className=" font-normal text-xl capitalize text-center mb-6">
                  CLAIM AIRDROP
                </h2> */}
                <div className="w-full flex flex-col justify-center items-center text-center mt-2">
                  <h2 className=" font-black md:text-4xl text-3xl capitalize">
                    Connect Wallet
                  </h2>
                  <p className="font-medium opacity-80 mt-2">
                    Please connect your wallet to continue
                  </p>
                </div>

                <div className="w-full grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 mt-10">
                  {CoinInformation.map((coin) => {
                    return (
                      <div
                        key={coin.id}
                        onClick={() => enableModalHandler(coin.id)}
                        className="w-full py-5 px-4 text-center shadow rounded-lg flex flex-col items-center justify-center gap-x-3 gap-y-4 cursor-pointer"
                      >
                        <div className="w-auto">
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-16 rounded-xl"
                            draggable={false}
                          />
                        </div>
                        <div className="w-full">
                          <h3 className="text-sm opacity-95">{coin.name} </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Spacer>
        </section>
      </main>
    </>
  );
};

export default WalletPage;
