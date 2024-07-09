import React from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiText } from "react-icons/bi";
import { MdSpatialAudio } from "react-icons/md";
import './ChannelList.css'

interface Channel {
  id: string;
  name: string;
  type: 'TEXT' | 'VOICE';
}

interface ChannelListProps {
  channels: Channel[];
}

const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  const textChannels = channels.filter(channel => channel.type === 'TEXT');
  const voiceChannels = channels.filter(channel => channel.type === 'VOICE');

  return (
    <div className='channel-list-container h-full'>
      {/* This is the top bar that shows the current server's name with a button to also access the settings */}
      <div className='server-bar'>
        <div className='font-medium text-4xl w-auto'>Server Name</div>
        <button className='flex justify-center'><RiArrowDropDownLine className='text-4xl' /></button>
      </div>

      <div className='channel-types bg-white mt-4 h-full'>
        <div className='text-channels'>
          <div className='channel-type'>Text Channels</div>
          {textChannels.map(channel => (
            <div key={channel.id} className='channel-item'>
              <BiText />
              {channel.name}
            </div>
          ))}
        </div>

        <div className='voice-channels mt-4'>
          <div className='channel-type'>Voice Channels</div>
          {voiceChannels.map(channel => (
            <div key={channel.id} className='channel-item'>
              <MdSpatialAudio />
              {channel.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Test Component
const TestChannelList = () => {
  const channels: Channel[] = [
    { id: '1', name: 'general', type: 'TEXT' },
    { id: '2', name: 'random', type: 'TEXT' },
    { id: '3', name: 'Voice Chat', type: 'VOICE' },
    { id: '4', name: 'Music', type: 'VOICE' },
  ];

  return <ChannelList channels={channels} />;
};

export default TestChannelList;
