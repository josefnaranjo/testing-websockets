import React, { useEffect, useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiText } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { MdSpatialAudio } from "react-icons/md";
import './ChannelList.css';

interface Channel {
  id: string;
  name: string;
  type: 'TEXT' | 'VOICE';
}

interface Server {
  id: string;
  name: string;
}

interface ChannelListProps {
  serverId: string;
}

const ChannelList: React.FC<ChannelListProps> = ({ serverId }) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [serverName, setServerName] = useState<string>('Loading...');
  const [loading, setLoading] = useState<boolean>(true);

  // Thanks to the new [serverId] folder and route, we can fetch specific server by ID
  useEffect(() => {
    const fetchServerDetails = async () => {
      try {
        const response = await fetch(`/api/servers/${serverId}`);
        console.log(`Fetching server with ID: ${serverId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch server: ${response.statusText}`);
        }
        const server: Server = await response.json();
        console.log('Server fetched:', server);
        setServerName(server.name);
      } catch (error) {
        console.error('Error loading server:', error);
        setServerName('Error loading server');
      }
    };

    // Channels are fetched after clicking on the server
    const fetchChannels = async () => {
      try {
        const response = await fetch(`/api/channels?serverId=${serverId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch channels: ${response.statusText}`);
        }
        const data = await response.json();
        setChannels(data);
      } catch (error) {
        console.error('Error loading channels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServerDetails();
    fetchChannels();
  }, [serverId]);

  if (loading) {
    return <div className='ml-2 my-4 font-bold text-xl'>Loading channels...</div>;
  }

  const textChannels = channels.filter(channel => channel.type === 'TEXT');
  const voiceChannels = channels.filter(channel => channel.type === 'VOICE');

  return (
    <div className='channel-list-container h-full'>
      <div className='server-bar'>
        <div className='server-name'>{serverName}</div>
        <button className='flex justify-center'>
          <RiArrowDropDownLine className='text-4xl' />
        </button>
      </div>

      <div className='channel-types bg-white mt-4 h-full'>
        <div className='text-channels'>
          <div className='channel-type'>
            Text Channels
            <button className='flex justify-center'>
              <FaPlus className='text-lg mr-4' />
            </button>
          </div>
          {textChannels.map(channel => (
            <div key={channel.id} className='channel-item'>
              <BiText className='mr-2' />
              {channel.name}
            </div>
          ))}
        </div>

        <div className='voice-channels mt-4'>
          <div className='channel-type'>
            Voice Channels 
            <button className='flex justify-center'>
              <FaPlus className='text-lg mr-4' />
            </button>
          </div>
          {voiceChannels.map(channel => (
            <div key={channel.id} className='channel-item'>
              <MdSpatialAudio className='mr-2' />
              {channel.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelList;