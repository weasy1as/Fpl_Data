"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SiPremierleague } from "react-icons/si";
import { IoMenu } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const [players, setPlayers] = useState<string[]>([]);
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const fetchPlayers = async (query: string) => {
    try {
      const response = await fetch(`/api/players/${encodeURIComponent(query)}`);
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    if (input.length >= 1) {
      fetchPlayers(input);
    } else {
      setPlayers([]);
    }
  }, [input]);

  const inputClick = (selectedPlayer: string) => {
    router.push(`/player/${selectedPlayer}`);
  };

  return (
    <nav className="p-6 flex justify-between items-center  bg-gradient-to-r from-[#00ff87] to-[#02efff]">
      <a href="/">
        <SiPremierleague />
      </a>
      <div>
        <div className="sm:hidden">
          <IoMenu />
        </div>
        <div className="hidden sm:flex gap-6">
          <a className="font-bold hover:underline" href="/compare">
            Compare player
          </a>
          <a href="" className="font-bold hover:underline">
            Squad builder
          </a>
          <div className="flex gap-3 items-center">
            <FaSearch />
            <div className="">
              <input
                className="rounded-xl p-1 focus:outline-none"
                type="search"
                name=""
                id=""
                onChange={handleChange}
                value={input}
              />
              {players.playerData?.length > 0 && (
                <ul className="absolute bg-white text-black shadow-md rounded-md mt-1  z-10 overflow-y-scroll scroll-auto h-[100px] w-[250px]">
                  {players.playerData.map((name: string, index: number) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-purple-100"
                      onClick={() => {
                        setInput("");
                        setPlayers([]);
                        inputClick(name);
                      }}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
