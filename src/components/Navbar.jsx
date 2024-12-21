import React from "react";
import { Link } from "react-router-dom";

// (Image)
import AppLogo from "../assets/logo.png";

// (Components)
import Spacer from "../components/Spacer";

const Navbar = () => {
  return (
    <section className="w-full bg-white/90 shadow-sm">
      <Spacer>
        <div className="w-full py-4 flex items-center justify-between">
          <div className="logo-image flex items-center gap-x-3">
            <Link to="/">
              <img src={AppLogo} alt="here-wallet" />
            </Link>
            <h2 className="font-bold text-2xl">Anyone</h2>
          </div>

          <div>
            <Link to={`/wallets`}>
              <button className="gradient_anyone text-primary font-medium border rounded-xl flex gap-1 justify-center items-center py-2 px-4">
                <span>Connect Wallet</span>
              </button>
            </Link>
          </div>
        </div>
      </Spacer>
    </section>
  );
};

export default Navbar;
