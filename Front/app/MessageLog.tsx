import user from "../public/user.png";
import animeGirl from "../public/kawaii-gun.jpg";
import MessageInput from "./components/MessageInput";
import MessageNav from "./components/MessageNav";
import UserMessages from "./components/Messages";

export default function MessageLog() {
  return (
    <>
      <MessageNav channelName="Channel #1" />
      <div className="flex flex-col justify-between h-full">
        <div className="overflow-auto flex-grow max-h-[720px]">
          <UserMessages
            img={user}
            name="Orchid"
            messages={[
              {
                time: "8:09 PM",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
              },
              { time: "8:10 PM", text: "Another message" },
              {
                time: "8:59 PM",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              },
              // Add more messages here...
            ]}
          />
          <UserMessages
            img={animeGirl}
            name="Uto Chan"
            messages={[
              {
                time: "9:05 PM",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
              },
              {
                time: "9:05 PM",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
              },
              // Add more messages here...
            ]}
          />
        </div>
        <MessageInput />
      </div>
    </>
  );
}
