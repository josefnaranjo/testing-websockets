import { NextRequest, NextResponse } from 'next/server';
import { db as prisma } from "@/lib/db";
import { currentUser } from '@/lib/current-user';


export async function GET(req: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const friends = await prisma.friend.findMany({
            where: {
                OR: [
                    { userId: user.id },
                    { friendId: user.id }
                ]
            },
            include: {
                user: true,
                friend: true
            }
        });

        return NextResponse.json(friends, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error retrieving friends list' }, { status: 500 });
    }
}
