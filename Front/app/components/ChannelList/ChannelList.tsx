import { MouseEvent, useEffect, useState } from "react";
import { BiText } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { MdSpatialAudio } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./ChannelList.css";
import ChannelListPopup from "./ChannelListPopup";

interface Channel {
  id: string;
  name: string;
  type: "TEXT" | "VOICE";
}

interface Server {
  id: string;
  name: string;
}

const ChannelList = ({ serverId }: { serverId: string }) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [serverName, setServerName] = useState<string>("Loading...");
  const [loading, setLoading] = useState<boolean>(true);
  const [newChannelName, setNewChannelName] = useState<string>("");
  const [newChannelType, setNewChannelType] = useState<"TEXT" | "VOICE">(
    "TEXT"
  );
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  useEffect(() => {
    const fetchServerDetails = async () => {
      try {
        const response = await fetch(`/api/servers/${serverId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch server: ${response.statusText}`);
        }
        const server: Server = await response.json();
        setServerName(server.name);
      } catch (error) {
        console.error("Error loading server:", error);
        setServerName("Error loading server");
      }
    };

    const fetchChannels = async () => {
      try {
        const response = await fetch(`/api/channels?serverId=${serverId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch channels: ${response.statusText}`);
        }
        const data = await response.json();
        setChannels(data);
      } catch (error) {
        console.error("Error loading channels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServerDetails();
    fetchChannels();
  }, [serverId]);

  const handleCreateChannel = async () => {
    if (!newChannelName) {
      alert("Channel name cannot be empty");
      return;
    }

    try {
      const response = await fetch("/api/channels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newChannelName,
          type: newChannelType,
          serverId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create channel: ${response.statusText}`);
      }

      const newChannel = await response.json();
      setChannels((prevChannels) => [...prevChannels, newChannel]);
      setNewChannelName("");
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  const handleDeleteChannel = async () => {
    if (!selectedChannel) return;

    try {
      const response = await fetch(`/api/channels`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ channelId: selectedChannel.id }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete channel: ${response.statusText}`);
      }

      setChannels((prevChannels) =>
        prevChannels.filter((channel) => channel.id !== selectedChannel.id)
      );
      setPopupVisible(false);
      setSelectedChannel(null);

      const newChannel = await response.json();
      setChannels((prevChannels) => [...prevChannels, newChannel]);
      setNewChannelName("");
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  const handleChannelRightClick = (
    event: MouseEvent<HTMLDivElement>,
    channel: Channel
  ) => {
    event.preventDefault();
    setSelectedChannel(channel);
    setPopupPosition({ x: event.clientX - 100, y: event.clientY });
    setPopupVisible(true);
  };

  if (loading) {
    return (
      <div className="ml-2 my-4 font-bold text-xl">Loading channels...</div>
    );
  }

  const textChannels = channels.filter((channel) => channel.type === "TEXT");
  const voiceChannels = channels.filter((channel) => channel.type === "VOICE");

  return (
    <div className="channel-list-container h-full">
      <div className="server-bar shadow-sm py-1">
        <div className="server-name">{serverName}</div>
        <button className="flex justify-center">
          <RiArrowDropDownLine className="text-4xl" />
        </button>
      </div>

      <div className="channel-types bg-white mt-4 h-full">
        <div className="text-channels">
          <div className="channel-type">
            Text Channels
            <button
              className="flex justify-center"
              onClick={() => setNewChannelType("TEXT")}
            >
              <FaPlus className="text-lg mr-4" />
            </button>
          </div>
          {textChannels.map((channel) => (
            <div
              key={channel.id}
              className="channel-item"
              onContextMenu={(event) => handleChannelRightClick(event, channel)}
            >
              <BiText className="mr-2" />
              {channel.name}
            </div>
          ))}
          <div className="create-channel-container flex justify-between mx-4 p-2 shadow-md">
            <div className="create-channel-form">
              <input
                type="text"
                placeholder="New Channel Name"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
                className="input pl-3 py-1 bg-white/20 focus:outline-zinc-400 rounded-md"
              />
              <button onClick={handleCreateChannel} className="btn-create">
                Create Channel
              </button>
            </div>
          </div>
        </div>

        <div className="voice-channels mt-4">
          <div className="channel-type">
            Voice Channels
            <button
              className="flex justify-center"
              onClick={() => setNewChannelType("VOICE")}
            >
              <FaPlus className="text-lg mr-4" />
            </button>
          </div>
          {voiceChannels.map((channel) => (
            <div
              key={channel.id}
              className="channel-item"
              onContextMenu={(event) => handleChannelRightClick(event, channel)}
            >
              <MdSpatialAudio className="mr-2" />
              {channel.name}
            </div>
          ))}
        </div>
      </div>

      {popupVisible && (
        <ChannelListPopup
          ChannelType={selectedChannel?.type!}
          position={popupPosition}
          onClose={() => setPopupVisible(false)}
          onDelete={handleDeleteChannel}
        />
      )}
    </div>
  );
};

export default ChannelList;
