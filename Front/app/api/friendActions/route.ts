import { GET as getFriends } from './getFriends';
import { POST as addFriend } from './addFriend';
import { DELETE as removeFriends } from './removeFriends';

// import { POST as joinServer } from './joinServer'; // Using an invite code to join a server

export { getFriends as GET, addFriend as POST, removeFriends as DELETE };