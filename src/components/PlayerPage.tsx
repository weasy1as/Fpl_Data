"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PlayerStatsCard from "./PlayerStatsCard";

const PlayerPage = () => {
  const [player, setplayer] = useState<any>(null);
  const params = useParams();
  const name = params?.name ? decodeURIComponent(params?.name) : "";

  useEffect(() => {
    fetch(`http://localhost:3000/api/statsPlayer/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setplayer(data);
      });
  }, []);
  return <PlayerStatsCard player={player} type={"playerPage"} />;
};

export default PlayerPage;
