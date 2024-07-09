import { NextRequest, NextResponse } from 'next/server';
import { db as prisma } from "@/lib/db";
import { currentUser } from '@/lib/current-user';


export async function DELETE(req: NextRequest) {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        const { friendId } = await req.json();

        await prisma.friend.deleteMany({
            where: {
                OR: [
                    { userId: user.id, friendId },
                    { userId: friendId, friendId: user.id }
                ]
            }
        });

        return NextResponse.json({ message: 'Friend removed successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error removing friend' }, { status: 500 });
    }
}
