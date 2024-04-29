'use client';
import MessageLog from "./MessageLog"
import React, { useState } from "react";
import SideBar from "./components/SideBar/SideBar";
import UserList, {generateUserList} from "./components/dm-list/dm-list";

export default function Home() {

 
  const userList = generateUserList(8);

  return (
    <div className="project-container">
      <div className="main-rows">
        <div className="side-channels-container">
          <SideBar />
        </div>
        <div className="messages-bar">
              <div className="w-[360px] h-[74px] left-0 top-0 absolute border-opacity-25">
              </div>
          </div>
        <div className="direct-messages-container relative">
      
          {/* Render UserList component */}
          <UserList userList={userList} />
        </div>
        <div className="message-log-container">
            <MessageLog />
        </div>
      </div>
    </div>
  );
}
