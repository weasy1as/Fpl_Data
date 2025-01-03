import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    // Try querying all the data to ensure it exists
    const players = await prisma.mergedGw.findMany();
    console.log(players); // Log the data to inspect the output
    res.status(200).json({ success: true, players });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
