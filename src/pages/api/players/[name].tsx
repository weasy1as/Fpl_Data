import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const { name } = req.query;
  console.log("Player name queried:", name);

  try {
    const playerData = await prisma.mergedGw.findMany({
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

    if (playerData.length === 0) {
      return res.status(404).json({ message: "Player not found." });
    }

    res.status(200).json({ playerData: playerData.map((p) => p.name) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
