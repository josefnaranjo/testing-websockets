import SideBar from "@/app/components/SideBar/SideBar";

export default function Home() {
  return (
    <div className="project-container">
      <nav className="navbar">Navbar</nav>
      <div className="main-rows">

        <div className="side-channels-container flex">
          <SideBar />
        </div>

        <div className="direct-messages-container"><h1>Side Messages</h1></div>
        <div className="message-log-container"><h1>Message Log</h1></div>
      </div>
    </div>

  );
}
