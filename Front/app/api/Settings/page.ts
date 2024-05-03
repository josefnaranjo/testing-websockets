import { NextRequest, NextResponse } from 'next/server';

// Static/dummy data (for demonstration purposes)
let userData = [
  {
    userID: 1,
    username: "josen5",
    name: "Jose",
    dob: '04-08-1997',
    business: "Software Development",
    memberSince: "Jan-23-2022",
    email: "josn5@gmail.com",
    phone: "209-209-0909",
    country: "USA",
    language: "English",
    about: "blablabla"
  },
];

// To handle a GET request to app/settings/page.tsx
export async function GET(request: NextRequest | null = null) {
  return NextResponse.json(userData, { status: 200 });
}
  
// To handle a POST request to app/settings/page.tsx
export async function POST(userID: number, newData: any) {
  try {
    const userIndex = userData.findIndex((user) => user.userID === userID);
    if (userIndex !== -1) {
      // If user exists, update the userData array with the new data
      userData[userIndex] = newData;
      return NextResponse.json({ message: 'User data updated successfully' }, { status: 200 });
    } else {
      // If user doesn't exist, return an error response
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.error();
  }
}
