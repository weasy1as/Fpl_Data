import React from "react";
import { FaSearch } from "react-icons/fa";
import { SiPremierleague } from "react-icons/si";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="p-6 flex justify-between items-center mb-5 bg-gradient-to-r from-[#00ff87] to-[#02efff]">
      <SiPremierleague />
      <div>
        <div className="sm:hidden">
          <IoMenu />
        </div>
        <div className="hidden sm:flex gap-6">
          <a className="font-bold hover:underline" href="">
            Compare player
          </a>
          <a href="" className="font-bold hover:underline">
            Squad builder
          </a>
          <div className="flex gap-3 items-center">
            <FaSearch />
            <input className="rounded-xl" type="search" name="" id="" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
