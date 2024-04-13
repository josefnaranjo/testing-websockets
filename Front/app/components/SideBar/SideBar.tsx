import { GiAmericanFootballBall } from "react-icons/gi";
import { IoIosAddCircle } from "react-icons/io";
import { PiPersonArmsSpreadDuotone, PiSoccerBallFill } from "react-icons/pi";
import { IoGameController } from "react-icons/io5";
import { BsGearFill } from "react-icons/bs";
import "./SideBar.css";

import React, { ReactNode } from 'react'

interface SideBarIconProps {
    icon: ReactNode;
    text: string;
}

const SideBar = () => {
  return (
    <div className='top-0 left-0 h-screen w-[72px] m-0
                    flex flex-col bg-green-400 text-white shadow-lg'>
        <SideBarIcon icon={<IoIosAddCircle size={"40px"}/>} text="Add Channel"/>
        <Divider />
        <SideBarIcon icon={<GiAmericanFootballBall size={"30px"}/>} text="Football Friends"/>
        <SideBarIcon icon={<PiSoccerBallFill size={"40px"}/>} text="Soccer Saurians"/>
        <SideBarIcon icon={<PiPersonArmsSpreadDuotone size={"30px"}/>} text="Communication"/>
        <SideBarIcon icon={<IoGameController size={"30px"}/>} text="Gaming Group"/>
        <Divider />
        <SideBarIcon 
            icon={<BsGearFill size={"30px"}/>} 
            text="Settings"/>
    </div>
  )
}
const SideBarIcon = ({ icon, text }: SideBarIconProps) => (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">
        {text}
      </span>
    </div>
);


const Divider = () => <hr className="sidebar-hr" />;

export default SideBar