const PRIMARY_NAME = ["A", "N", "H", "L", "Q", "9", "8"];
const INFO_NAME = ["F", "G", "T", "I", "J", "1", "2", "3"];
const SUCCESS_NAME = ["K", "D", "Y", "B", "O", "4", "5"];
const WARNING_NAME = ["P", "E", "R", "S", "C", "U", "6", "7"];
const ERROR_NAME = ["V", "W", "X", "M", "Z"];

function getFirstCharacter(name: string) {
  return name && name.charAt(0).toUpperCase();
}

function getAvatarColor(name: string) {
  if (PRIMARY_NAME.includes(getFirstCharacter(name))) return "#2b4efe";
  if (INFO_NAME.includes(getFirstCharacter(name))) return "#1890FF";
  if (SUCCESS_NAME.includes(getFirstCharacter(name))) return "#54D62C";
  if (WARNING_NAME.includes(getFirstCharacter(name))) return "#FFC107";
  if (ERROR_NAME.includes(getFirstCharacter(name))) return "#FF4842";
  return "default";
}

export default function createAvatar(name: string) {
  return {
    name: getFirstCharacter(name),
    color: getAvatarColor(name)
  };
}
