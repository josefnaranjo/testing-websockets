import Image, { StaticImageData } from "next/image";
import smolSkul from "./smolskul.png";
import './dm-list.css'

type User = {
  name: string;
  icon: StaticImageData;
  activeState: 'active' | "away" | "offline";
};

export function generateUserList(numUsers: number): { [key: string]: User } {
  let userList: { [key: string]: User } = {};

  for (let i = 1; i <= numUsers; i++) {
    let activeState: User['activeState'] = 'active'; // Default to 'active'

    if (i > 5) {
      activeState = 'away';
    }
    if (i > 8) {
      activeState = 'offline';
    }

    let user: User = {
      name: `user${i}`,
      icon: smolSkul,
      activeState: activeState
    };

    userList[`user${i}`] = user;
  }

  return userList;
}
const getColorFromState = (state: 'active' | 'away' | 'offline'): string => {
    switch (state) {
      case 'active':
        return 'green';
      case 'away':
        return 'yellow';
      case 'offline':
        return 'red';
      default:
        return ''; 
    }
  };
const UserList: React.FC<{ userList: { [key: string]: User } }> = ({ userList }) => {
    return (
      <div className="list-container">
        <h4>Chats</h4>
        <ul className="user-list">
          {Object.values(userList).map(user => (
            <li key={user.name} className="user-item">
              <Image src={user.icon} alt={user.name} width={40} height={40} className="user-icon" />
              <span className="user-name">{user.name}</span>
              {/* Conditionally set background color */}
              <div className={` user-state`} style={{backgroundColor:`${getColorFromState(user.activeState)}`}}></div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default UserList;