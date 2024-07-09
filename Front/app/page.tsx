'use client'

import React, { useState } from "react";
import MessageLog from "./MessageLog";
import SideBar from "./components/SideBar/SideBar/SideBar";
import UserList, { generateUserList } from "./components/dm-list/dm-list";
import ChannelList from "./components/ChannelList/ChannelList";

export default function Home() {
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null);
  const userList = generateUserList(5);

  return (
    <div className="project-container">
      <div className="main-rows bg-white">
        <div className="side-channels-container">
          <SideBar onSelectServer={setSelectedServerId} />
        </div>
        <div className="messages-bar">
          <div className="w-[360px] h-[74px] left-0 top-0 absolute border-opacity-25"></div>
        </div>
        <div className="direct-messages-container relative">
          {selectedServerId ? (
            <ChannelList serverId={selectedServerId} />
          ) : (
            <UserList userList={userList} />
          )}
        </div>
        <div className="message-log-container">
          <MessageLog />
        </div>
      </div>
    </div>
  );
}
