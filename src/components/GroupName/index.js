import { useState } from "react";

function GroupName({ handleGroupName, onCheck }) {
  const [groupName, setGroupName] = useState("");

  const handleInputs = (e) => {
    setGroupName(e.target.value);
    handleGroupName(groupName);
  };

  const onCheckGroupName = () => {
    onCheck(groupName);
  };
  return (
    <div className="group-container">
      <input
        placeholder="그룹명"
        type="text"
        name="groupName"
        value={groupName}
        onChange={handleInputs}
      />
      <button onClick={onCheckGroupName}>중복확인</button>
    </div>
  );
}

export default GroupName;
