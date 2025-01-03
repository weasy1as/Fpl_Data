import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    const players = await prisma.mergedGw.findMany({
      select: {
        name: true,
        team: true,
      },
    });
    console.log(players);
    res.status(200).json({ success: true, players });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
