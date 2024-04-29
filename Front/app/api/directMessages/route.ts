import { NextResponse, NextRequest } from "next/server";


// "localhost:3000/api/getChannelMessages/" + channelId + "?startTS=0"
// To handle a GET request to /channelMessages
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const result = [
    {userID: 1, channelID: 1, createdTS: 1, messageContent: 'yolo', updateTS: 1},
    {userID: 1, channelID: 1, createdTS: 3, messageContent: 'yay', updateTS: 3},
    {userID: 2, channelID: 1, createdTS: 4, messageContent: 'all', updateTS: 4},
    {userID: 2, channelID: 1, createdTS: 5, messageContent: 'one', updateTS: 5},
    {userID: 2, channelID: 1, createdTS: 6, messageContent: 'bubble', updateTS: 6},
    {userID: 1, channelID: 1, createdTS: 7, messageContent: 'hello world', updateTS: 7}
  ];
  return NextResponse.json(result, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request: NextRequest) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World post" }, { status: 200 });
} 