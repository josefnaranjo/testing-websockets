import { NextRequest, NextResponse } from 'next/server';
import { db as prisma } from '@/lib/db';
import { currentUser } from '@/lib/current-user';

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const { friendId } = await req.json();

        // Check if the friendId is valid
        const friendUser = await prisma.user.findUnique({
            where: { id: friendId },
        });

        if (!friendUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if the friendship already exists
        const existingFriendship = await prisma.friend.findFirst({
            where: {
                OR: [
                    { userId: user.id, friendId: friendId },
                    { userId: friendId, friendId: user.id }
                ],
            },
        });

        if (existingFriendship) {
            return NextResponse.json({ error: 'Friendship already exists' }, { status: 400 });
        }

        // Create friendship both ways
        await prisma.friend.createMany({
            data: [
                { userId: user.id, friendId: friendId },
                { userId: friendId, friendId: user.id },
            ],
        });

        return NextResponse.json({ success: 'Friend added successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error adding friend' }, { status: 500 });
    }
}
