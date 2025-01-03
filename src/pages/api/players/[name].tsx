import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { name } = req.query; // Get player name from query

  try {
    const playerData = await prisma.mergedGW.findMany({
      where: {
        name: {
          contains: "Mohamed Salah", // Search for players matching the name
        },
      },
    });

    if (playerData.length === 0) {
      return res.status(404).json({ message: "Player not found." });
    }

    res.status(200).json(playerData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
