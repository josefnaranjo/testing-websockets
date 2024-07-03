import { NextRequest, NextResponse } from 'next/server';
import { db as prisma } from "@/lib/db";
import { currentUser } from '@/lib/current-user';

export async function GET() {
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

        const uniqueFriends = Array.from(new Set(friends.map(friend => {
            const friendId = friend.userId === user.id ? friend.friend.id : friend.user.id;
            const friendName = friend.userId === user.id ? friend.friend.name : friend.user.name;
            return JSON.stringify({ id: friendId, name: friendName });
        }))).map(str => JSON.parse(str));

        console.log(uniqueFriends);  // Log the unique friends list

        return NextResponse.json(uniqueFriends, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error retrieving friends list' }, { status: 500 });
    }
}
