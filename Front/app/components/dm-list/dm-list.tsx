import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./dm-list.css";
import icon1 from "./icon.png";
import icon2 from "./icon2.jpg";
import icon3 from "./icon3.png";
import icon4 from "./icon4.jpg";
import icon5 from "./icon5.png";

type User = {
  name: string;
  icon: StaticImageData;
  activeState: "active" | "away" | "offline";
};

export function generateUserList(numUsers: number): { [key: string]: User } {
  let userList: { [key: string]: User } = {};
  let userIconArray = [icon1, icon2, icon3, icon4, icon5];

  for (let i = 1; i <= numUsers; i++) {
    const states = ["active", "away", "offline"];
    const activeState = states[
      Math.floor(Math.random() * states.length)
    ] as User["activeState"];

    const iconIndex = Math.floor(Math.random() * userIconArray.length);
    const icon = userIconArray.splice(iconIndex, 1)[0]; // This removes the icon from the array and returns it

    let user: User = {
      name: `user${i}`,
      icon: icon,
      activeState: activeState,
    };

    userList[`user${i}`] = user;
  }

  return userList;
}

const getColorFromState = (state: "active" | "away" | "offline"): string => {
  switch (state) {
    case "active":
      return "green";
    case "away":
      return "yellow";
    case "offline":
      return "gray";
    default:
      return "";
  }
};

const UserList: React.FC<{ userList: { [key: string]: User } }> = ({
  userList,
}) => {
  const [selected, onSelected] = useState<string | null>(null);

  return (
    <div className="list-container">
      <div className="flex items-center h-[63px] border-b border-gray-400/opacity-25 hover:bg-gray-100">
        <h4 className="font-semibold text-3xl pr-[10px] pl-[16px] select-none">Direct Messages</h4>
        {/* <FaRegCircle size={25} className="mt-1" /> */}
      </div>
      <ul className="user-list">
        {Object.values(userList).map((user) => (
          <li
            key={user.name}
            className={`user-item transition-colors duration-200 cursor-pointer ${
              selected === user.name
                ? "group bg-gray-200 "
                : "group hover:bg-gray-200"
            }`}
            style={{ maxWidth: "360px" }}
            onClick={() =>
              onSelected(user.name === selected ? null : user.name)
            }
          >
            <div className="user-icon">
              <Image
                src={user.icon}
                alt={user.name}
                fill={true}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col w-full pl-3 max-w-[272px]">
              <span className="user-name">{user.name}</span>
              <p className="truncate text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                ab quasi soluta
              </p>
            </div>
            {/* Conditionally set background color */}
            <div
              className="user-state absolute bottom-3 left-12"
              style={{
                backgroundColor: `${getColorFromState(user.activeState)}`,
              }}
            />
            <button
              className="absolute top-2 right-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={() => console.log("clicked")}
            >
              <RxCross2
                className="hover:text-red-500"
                style={{ width: "18px", height: "18px" }}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
