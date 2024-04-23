import React from "react";
import { ChevronDown, Users, Settings, LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut } from "next-auth/react";

interface MenuInterface {
    id: number,
    name: string,
    path: string,
    icon: any
}

function sidebarTopSection() {
    const menu: MenuInterface=[
        {
            id:1,
            name:'Create Team',
            path:'/teams/create',
            icon:Users
        },
        {
            id:2,
            name:'Settings',
            path:'',
            icon:Settings
        }
    ];
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center justify-center gap-3 hover:bg-slate-200 p-3 rounded-lg">
            <span className="font-bold text-lg text-red-600">
              C<span className=" text-sky-600">Craft</span>
            </span>
            <h2 className="flex items-center justify-center text-[17px] gap-2 font-bold">
              Team Name
              <ChevronDown />
            </h2>
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-2 p-4">
            {/* Team section */}
            <div>
                <h2>Team Name</h2>
            </div>
            {/* Option Section */}
            <div>
                {menu.map((item,idx) => ( <h2 key={idx} className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg text-sm cursor-pointer"> <item.icon className='h-4 w-4'/> { item.name } </h2> ))}
                <h2 className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg text-sm cursor-pointer" onClick={() => signOut()}> <LogOut className='h-4 w-4'/> Logout </h2>
            </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default sidebarTopSection;
