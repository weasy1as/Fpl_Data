"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PlayerPage = () => {
  const [player, setplayer] = useState<any>(null);
  const params = useParams(); // Get all URL parameters as an object
  const name = params?.name ? decodeURIComponent(params?.name) : "";
  console.log(name);

  useEffect(() => {
    console.log(name);
    fetch(`http://localhost:3000/api/statsPlayer/${name}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched player data:", data);
        setplayer(data);
      });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center gap-4 py-5">
      <h1 className="text-3xl font-bold text-center mb-6">
        Player name: {player?.playerName.name}
      </h1>

      <div className="bg-[#37003c] text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Player Stats</h1>

        <div className="bg-[#4a0f5c] p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Totals</h2>
          <div className="flex flex-col gap-3 text-lg">
            <p>
              Goals Scored:{" "}
              <span className="font-bold">{player?.totals?.goals_scored}</span>
            </p>
            <p>
              Assists:{" "}
              <span className="font-bold">{player?.totals?.assists}</span>
            </p>
            <p>
              Clean Sheets:{" "}
              <span className="font-bold">{player?.totals?.clean_sheets}</span>
            </p>
            <p>
              Total Points:{" "}
              <span className="font-bold">{player?.totals?.total_points}</span>
            </p>
          </div>
        </div>

        <div className="bg-[#4a0f5c] p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Averages</h2>
          <div className="flex flex-col gap-3 text-lg">
            <p>
              Average Goals Scored:{" "}
              <span className="font-bold">
                {player?.averages?.goals_scored}
              </span>
            </p>
            <p>
              Average Expected Points:{" "}
              <span className="font-bold">{player?.averages?.xP}</span>
            </p>
            <p>
              Average Threat:{" "}
              <span className="font-bold">{player?.averages?.threat}</span>
            </p>
            <p>
              Average Expected Assists:{" "}
              <span className="font-bold">
                {player?.averages?.expected_assists}
              </span>
            </p>
            <p>
              Average Expected Goal Involvements:{" "}
              <span className="font-bold">
                {player?.averages?.expected_goal_involvements}
              </span>
            </p>
            <p>
              Average Creativity:{" "}
              <span className="font-bold">{player?.averages?.creativity}</span>
            </p>
            <p>
              Average Minutes:{" "}
              <span className="font-bold">{player?.averages?.minutes}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
