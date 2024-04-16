import SideBar from "@/app/components/SideBar/SideBar";
import UserList, {generateUserList} from "./components/dm-list/dm-list"
const userList = generateUserList(13);
export default function Home() {
  return (
    <div className="project-container">
      <nav className="navbar">Navbar</nav>
      <div className="main-rows">

        <div className="side-channels-container flex">
          <SideBar />
        </div>

        <div className="direct-messages-container">
          <h1>Side Messages</h1>
          <UserList userList={userList} />
          </div>
        <div className="message-log-container"><h1>Message Log</h1></div>
      </div>
    </div>

  );
}
