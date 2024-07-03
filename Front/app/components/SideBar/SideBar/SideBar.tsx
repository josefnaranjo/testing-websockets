import React, { useState, useEffect, MouseEvent } from "react";
import { IoIosAddCircle } from "react-icons/io"; // Icon for server creating/joining
import { BsGearFill } from "react-icons/bs"; // Icon for logout and going into account details
import { IoPersonAdd } from "react-icons/io5";
import "./SideBar.css"; // Styling for the SideBar

import SideBarIcon from "../SideBarIcon/SideBarIcon";
import Divider from "../Divider/Divider";
import Popup from "../Popup/Popup";
import SettingsPopup from "../SettingsPopup/SettingsPopup";
import AddPopup from "../AddPopup/AddPopup";
import FriendPopup from "../FriendPopup/FriendPopup";

import { useOutsideClick } from "./useOutsideClick"; // Import the custom hook

interface Server {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  inviteCode?: string;
}

const SideBar = () => {

  // Deals with everything on servers
  const [selectedServer, setSelectedServer] = useState("");
  const [selectedServerId, setSelectedServerId] = useState(""); 
  const [servers, setServers] = useState<Server[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newServerName, setNewServerName] = useState("");
  const [inviteCode, setInviteCode] = useState(""); // New state for invite code, needs to get and set

  // Position, Visibility of PopUps
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [popupVisible, setPopupVisible] = useState(false);

  // Visibility of PopUps
  const [settingsPopupVisible, setSettingsPopupVisible] = useState(false);
  const [addPopupVisible, setAddPopupVisible] = useState(false);
  const [friendPopupVisible, setFriendPopupVisible] = useState(false);



  // Gets servers for current user
  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch("/api/servers");
        if (!response.ok) {
          throw new Error("Failed to fetch servers");
        }
        const data: Server[] = await response.json();
        setServers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchServers();
  }, []);

  //Changed from onDoubleClick to onContextMenu aka handIconRightClick
  const handleIconRightClick = async (
    text: string | undefined,
    event: MouseEvent<HTMLDivElement>,
    serverId: string | undefined
  ) => {
    event.preventDefault();
    if (text && event) {
      setSelectedServer(text);
      setSelectedServerId(serverId || "");

      // Fetch invite code when the popup is opened through the right click
      if (serverId) {
        try {
          const response = await fetch(`/api/userServerActions?serverId=${serverId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch invite code");
          }
          const { inviteCode } = await response.json();
          setInviteCode(inviteCode);
        } catch (error) {
          console.error(error);
        }
      }

      const { clientX, clientY } = event;
      setPopupPosition({ x: clientX, y: clientY });
      setPopupVisible(true);
      setSettingsPopupVisible(false);
      setAddPopupVisible(false);
      setFriendPopupVisible(false);
      setIsEditing(false); // Reset edit mode when switching servers
    }
  };

  const handleIconClick = () => {
    if (popupVisible) {
      setPopupVisible(false);
    }
  };

  const handleSettingsClick = (
    text?: string,
    event?: MouseEvent<HTMLDivElement>
  ) => {
    if (event) {
      const { clientX, clientY } = event;
      setPopupPosition({ x: clientX, y: clientY });
      setSettingsPopupVisible((prev) => !prev);
      setPopupVisible(false);
      setAddPopupVisible(false);
      setFriendPopupVisible(false);
    }
  };

  const handleAddServerClick = (
    text?: string,
    event?: MouseEvent<HTMLDivElement>
  ) => {
    if (event) {
      const { clientX, clientY } = event;
      setPopupPosition({ x: clientX, y: clientY });
      setAddPopupVisible((prev) => !prev);
      setSettingsPopupVisible(false);
      setPopupVisible(false);
      setFriendPopupVisible(false);
    }
  };

  const handleFriendClick = (
    text?: string,
    event?: MouseEvent<HTMLDivElement>
  ) => {
    if (event) {
      const { clientX, clientY } = event;
      setPopupPosition({ x: clientX, y: clientY });
      setFriendPopupVisible((prev) => !prev);
      setAddPopupVisible(false);
      setSettingsPopupVisible(false);
      setPopupVisible(false);
    }
  };

  const handleClosePopup = () => setPopupVisible(false);
  const handleCloseSettingsPopup = () => setSettingsPopupVisible(false);
  const handleCloseAddPopup = () => setAddPopupVisible(false);
  const handleCloseFriendPopup = () => setFriendPopupVisible(false);

  const handleLeaveServer = async () => {
    try {
      const response = await fetch('/api/userServerActions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serverId: selectedServerId }),
      });
  
      if (response.ok) {
        console.log('Successfully left the server');
        setServers((prevServers) =>
          prevServers.filter((server) => server.id !== selectedServerId)
        );
        setPopupVisible(false);
        window.location.reload(); // Refresh the window
      } else {
        const errorData = await response.json();
        console.error('Failed to leave server:', errorData);
      }
    } catch (error) {
      console.error('Error leaving server:', error);
    }
  };

  const handleEditServerName = async () => {
    try {
      const response = await fetch("/api/servers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedServerId, name: newServerName }),
      });

      if (response.ok) {
        console.log("Server name updated successfully");
        setServers((prevServers) =>
          prevServers.map((server) =>
            server.id === selectedServerId
              ? { ...server, name: newServerName }
              : server
          )
        );
        setIsEditing(false);
        setPopupVisible(false);
      } else {
        const errorData = await response.json();
        console.error("Failed to update server name:", errorData);
      }
    } catch (error) {
      console.error("Error updating server name:", error);
    }
  };

  // Use the custom hook for outside click detection
  const popupRef = useOutsideClick(() => setPopupVisible(false));

  return (
    <div className="top-0 left-0 h-full w-[72px] m-0 flex flex-col text-white shadow-lg sidebar-container">
      <SideBarIcon
        icon={<IoPersonAdd size={"30px"} />}
        text="Friends"
        onClick={handleFriendClick}
      />
      <SideBarIcon
        icon={<IoIosAddCircle size={"40px"} />}
        text="Add Server"
        onClick={handleAddServerClick}
      />
      <Divider />
      {servers.map((server) => (
        <SideBarIcon
          key={server.id}
          text={server.name}
          onClick={handleIconClick}
          onContextMenu={(event) =>
            handleIconRightClick(server.name, event, server.id)
          } // Changed from onDoubleClick to onContextMenu
        />
      ))}
      <Divider />
      <SideBarIcon
        icon={<BsGearFill size={"30px"} />}
        text="Settings"
        onClick={handleSettingsClick}
      />
      {popupVisible && (
        <Popup
          server={selectedServer}
          onClose={handleClosePopup}
          onLeave={handleLeaveServer}
          onEdit={() => setIsEditing(true)}
          isEditing={isEditing}
          newServerName={newServerName}
          setNewServerName={setNewServerName}
          handleEditServerName={handleEditServerName}
          position={popupPosition}
          inviteCode={inviteCode}
          ref={popupRef} // Attach the ref to the popup
        />
      )}
      {settingsPopupVisible && (
        <SettingsPopup
          onClose={handleCloseSettingsPopup}
          position={popupPosition}
        />
      )}
      {addPopupVisible && (
        <AddPopup onClose={handleCloseAddPopup} position={popupPosition} />
      )}
      {friendPopupVisible && (
        <FriendPopup
          onClose={handleCloseFriendPopup}
          position={popupPosition}
        />
      )}
    </div>
  );
};

export default SideBar;
