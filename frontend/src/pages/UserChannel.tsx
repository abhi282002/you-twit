import React, { useState } from "react";
import UploadVideo from "../components/UploadVideoComponent";

const UserChannel = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="bg-[#ffff]   h-[80vh] flex flex-col justify-center items-center">
      {isOpen && <UploadVideo setOpen={() => setIsOpen((prev) => !prev)} />}
    </div>
  );
};

export default UserChannel;
