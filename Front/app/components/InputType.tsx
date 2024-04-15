import { IconType } from 'react-icons';

interface InputWithIconProps {
  placeholder: string;
  type: string;
  id: string;
  Icon: IconType;
}

const InputType: React.FC<InputWithIconProps> = ({ placeholder, type, id, Icon }) => {
  return (
    <div className="relative group">
      <input placeholder={placeholder} type={type} id={id} className="border border-gray-200 rounded-md pl-3 pr-10 w-[252px] h-10 outline-gray-400" />
      <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:opacity-0 transition-opacity duration-250" />
    </div>
  );
};

export default InputType;
