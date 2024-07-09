import { GET as getServers } from './getServers';
import { POST as createServer } from './createServer';
import { DELETE as deleteServer } from './deleteServer';
import { PUT as updateServer } from './updateServer';

// import { POST as joinServer } from './joinServer'; // Using an invite code to join a server

export { getServers as GET, createServer as POST, deleteServer as DELETE, updateServer as PUT };
