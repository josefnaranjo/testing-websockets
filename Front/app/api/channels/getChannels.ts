import { NextRequest, NextResponse } from "next/server";
import { db as prisma } from "@/lib/db";
import { currentUser } from "@/lib/current-user";

export async function GET(req: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: 'Not authenticated.'}, {status: 401});
        }

        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get('serverId');

        if (!serverId) {
            return NextResponse.json({ error: 'Missing serverId.'}, {status: 400});
        }

        const channels = await prisma.channel.findMany({
            where: { serverId },
        });

        return NextResponse.json(channels, {status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error getting channels.'}, {status: 500 });
    }
}