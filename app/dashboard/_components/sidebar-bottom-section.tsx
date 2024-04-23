import { Archive, Flag, Github } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function sidebarBottomSection({ onFileCreate, totalFiles }: any) {
  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      icon: Flag,
      path: "",
    },
    {
      id: 2,
      name: "Github",
      icon: Github,
      path: "",
    },
    {
      id: 3,
      name: "Archive",
      icon: Archive,
      path: "",
    },
  ];

  const [fileInput, setFileInput] = useState('');

  return (
    <div>
      {menuList.map((menu, idx) => (
        <h2
          key={idx}
          className="flex gap-2 p-1 px-2 text-[14px] hover:bg-gray-100 rounded-md cursor-pointer"
        >
          {" "}
          <menu.icon className="h-5 w-5" /> {menu.name}
        </h2>
      ))}

      {/* Add New File Button */}

      <Dialog>
        <DialogTrigger className="w-full">
          <button className="w-full bg-blue-600 hover:bg-blue-700 flex justify-start my-3 p-2 rounded-md text-white text-sm font-medium">
            New File
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              <input
                type="text"
                placeholder="Enter File Name"
                className="mt-3 border border-gray-400 w-full p-4 rounded-lg text-black font-semiBold"

                onChange={(e) => setFileInput(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button onClick={() => onFileCreate(fileInput)} type="submit" className="mt-4 bg-blue-600 disabled:bg-blue-500 hover:bg-blue-700 w-full p-2 rounded-md font-bold text-white" disabled={!(fileInput&&fileInput.length>3)}>Create</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default sidebarBottomSection;
