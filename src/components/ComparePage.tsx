"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import PlayerStatsCard from "./PlayerStatsCard";

const ComparePage = () => {
  const [playerOne, setPlayerOne] = useState<any>(null);
  const [playerTwo, setPlayerTwo] = useState<any>(null);
  const [inputOne, setInputOne] = useState<string>("");
  const [inputTwo, setInputTwo] = useState<string>("");
  const [suggestionsOne, setSuggestionsOne] = useState<string[]>([]);
  const [suggestionsTwo, setSuggestionsTwo] = useState<string[]>([]);

  const fetchPlayers = async (query: string) => {
    try {
      const response = await fetch(`/api/players/${encodeURIComponent(query)}`);
      const data = await response.json();
      return data.playerData || [];
    } catch (error) {
      console.error("Error fetching players:", error);
      return [];
    }
  };

  const fetchPlayerStats = async (name: string) => {
    try {
      const response = await fetch(
        `/api/statsPlayer/${encodeURIComponent(name)}`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching player stats:", error);
      return null;
    }
  };

  const handlePlayerOneChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setInputOne(query);
    if (query.length >= 1) {
      const players = await fetchPlayers(query);
      setSuggestionsOne(players);
    } else {
      setSuggestionsOne([]);
    }
  };

  const selectPlayerOne = async (name: string) => {
    setInputOne(name);
    setSuggestionsOne([]);
    const stats = await fetchPlayerStats(name);
    setPlayerOne(stats);
  };

  const handlePlayerTwoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setInputTwo(query);
    if (query.length >= 1) {
      const players = await fetchPlayers(query);
      setSuggestionsTwo(players);
    } else {
      setSuggestionsTwo([]);
    }
  };

  const selectPlayerTwo = async (name: string) => {
    setInputTwo(name);
    setSuggestionsTwo([]);
    const stats = await fetchPlayerStats(name);
    setPlayerTwo(stats);
  };

  return (
    <div className="flex flex-col justify-center items-center pb-4">
      <h1 className="text-3xl font-bold text-center mb-2"> Compare player</h1>
      <div className="flex gap-3 ">
        <div className="flex flex-col  items-center bg-[#37003c] text-white p-6 rounded-lg shadow-lg">
          <div className="flex gap-3 mb-2 items-center">
            <FaSearch />
            <div className="">
              <input
                className="rounded-xl p-1 focus:outline-none text-black"
                type="search"
                placeholder="Search Player One"
                name=""
                id=""
                onChange={handlePlayerOneChange}
                value={inputOne}
              />
              {suggestionsOne.length > 0 && (
                <ul className="absolute bg-white text-black shadow-md rounded-md mt-1  z-10 overflow-y-scroll scroll-auto h-[100px] w-[250px]">
                  {suggestionsOne.map((name: string, index: number) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-purple-100"
                      onClick={() => selectPlayerOne(name)}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <PlayerStatsCard player={playerOne} type={"compare"} />
        </div>
        <div className="flex flex-col  items-center bg-[#37003c] text-white p-6 rounded-lg shadow-lg">
          <div className="flex gap-3 mb-2 items-center">
            <FaSearch />
            <div className="">
              <input
                className="rounded-xl p-1 focus:outline-none text-black"
                type="search"
                placeholder="Search Player One"
                name=""
                id=""
                onChange={handlePlayerTwoChange}
                value={inputTwo}
              />
              {suggestionsTwo.length > 0 && (
                <ul className="absolute bg-white text-black shadow-md rounded-md mt-1  z-10 overflow-y-scroll scroll-auto h-[100px] w-[250px]">
                  {suggestionsTwo.map((name: string, index: number) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-purple-100"
                      onClick={() => selectPlayerTwo(name)}
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <PlayerStatsCard player={playerTwo} type={"compare"} />
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
