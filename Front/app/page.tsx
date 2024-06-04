"use client";
import MessageLog from "./MessageLog";
import React, { useState } from "react";
import SideBar from "./components/SideBar/SideBar/SideBar";
import UserList, { generateUserList } from "./components/dm-list/dm-list";

export default function Home() {
  const userList = generateUserList(5);

  return (
    <div
      className="project-container"
      // style={{
      //   backgroundImage: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
      // }}
    >
      <div className="main-rows bg-white">
        <div className="side-channels-container">
          <SideBar />
        </div>
        <div className="messages-bar">
          <div className="w-[360px] h-[74px] left-0 top-0 absolute border-opacity-25"></div>
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
