import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const { name } = req.query;
    console.log("Player name queried:", name);

    if (!name) {
      return res.status(400).json({ error: "Player name is required" });
    }

    const playerName = await prisma.mergedGw.findFirst({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      select: {
        name: true,
      },
      distinct: ["name"],
    });

    if (!playerName) {
      return res
        .status(404)
        .json({ error: "Player not found in the database" });
    }

    const aggregations = await prisma.mergedGw.aggregate({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      _avg: {
        goals_scored: true,
        xP: true,
        threat: true,
        expected_assists: true,
        expected_goal_involvements: true,
        creativity: true,
        total_points: true,
        minutes: true,
      },
      _sum: {
        goals_scored: true,
        assists: true,
        clean_sheets: true,
        total_points: true,
      },
    });

    console.log("Aggregation results:", aggregations);

    res.status(200).json({
      message: "Aggregations fetched successfully!",
      averages: aggregations._avg,
      totals: aggregations._sum,
      playerName: playerName,
    });
  } catch (error) {
    console.error("Error during aggregation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching aggregations" });
  }
}
