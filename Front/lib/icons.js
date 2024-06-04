// This will be for later so that I can have PRESET icons for users to choose from
// Should be fun to demonstrate in real time

import { GiAmericanFootballBall } from "react-icons/gi";
import { IoIosAddCircle } from "react-icons/io";
import { PiPersonArmsSpreadDuotone, PiSoccerBallFill } from "react-icons/pi";
import { IoGameController } from "react-icons/io5";
import { BsGearFill } from "react-icons/bs";
import { FaExternalLinkAlt, FaCamera } from "react-icons/fa";

// Define the icon components mapping
export const icons = {
  football: <GiAmericanFootballBall size="30px" />,
  add: <IoIosAddCircle size="40px" />,
  soccer: <PiSoccerBallFill size="40px" />,
  communication: <PiPersonArmsSpreadDuotone size="30px" />,
  gaming: <IoGameController size="30px" />,
  settings: <BsGearFill size="30px" />,
  externalLink: <FaExternalLinkAlt />,
  camera: <FaCamera size="45px" />,
};
