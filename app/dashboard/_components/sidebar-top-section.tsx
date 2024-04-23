"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, Users, Settings, LogOut, LayoutGrid } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

interface MenuInterface {
  id: number;
  name: string;
  path: string;
  icon: any;
}

export interface TeamInterface {
  createdBy: String;
  teamName: String;
  _id: String;
}

function sidebarTopSection({ user, setActiveTeamInfo }: any) {
  const menu: MenuInterface = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];

  const [teamList, setTeamList] = useState<TeamInterface[]>();
  const [activeTeam, setActiveTeam] = useState<TeamInterface>();
  const router = useRouter();

  const onMenuClick = (item: any) => {
    if (item) {
      router.push(item.path);
    }
  };

  useEffect(() => {
    user && getTeamList();
  }, [user]);

  useEffect(() => {
    activeTeam && setActiveTeamInfo(activeTeam);
  }, [activeTeam]);

  const convex = useConvex();
  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });

    console.log("Team List: ", result);
    setTeamList(result);
    setActiveTeam(result[0]);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex items-center justify-center gap-3 hover:bg-slate-200 p-3 rounded-lg">
            <span className="font-bold text-lg text-red-600">
              C<span className=" text-sky-600">Craft</span>
            </span>
            <h2 className="flex items-center justify-center text-[17px] gap-2 font-bold">
              {activeTeam?.teamName}
              <ChevronDown />
            </h2>
          </div>
        </PopoverTrigger>
        <PopoverContent className="ml-2 p-4">
          {/* Team section */}
          <div>
            {teamList?.map((team, idx) => (
              <h2
                key={idx}
                onClick={() => setActiveTeam(team)}
                className={`p-2 hover:bg-sky-600 hover:text-white rounded-lg mb-1 cursor-pointer ${activeTeam?._id === team._id && "bg-sky-600 text-white"}`}
              >
                {" "}
                {team.teamName}{" "}
              </h2>
            ))}
          </div>
          <Separator className="mt-2 bg-slate-100" />
          {/* Option Section */}
          <div>
            {menu.map((item, idx) => (
              <h2
                key={idx}
                className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg text-sm cursor-pointer"
                onClick={() => onMenuClick(item)}
              >
                {" "}
                <item.icon className="h-4 w-4" /> {item.name}{" "}
              </h2>
            ))}
            <h2
              className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg text-sm cursor-pointer"
              onClick={() => signOut()}
            >
              {" "}
              <LogOut className="h-4 w-4" /> Logout{" "}
            </h2>
          </div>

          <Separator className="mt-2 bg-slate-100" />
          {/* User Info Section */}

          {user && (
            <div className="mt-2 flex gap-3 items-center">
              <Image
                src={user?.image}
                width={30}
                height={30}
                alt="user"
                className="rounded-full"
              />
              <div>
                <h2 className="text-[14px] font-bold">{user?.name}</h2>
                <h2 className="text-[12px] text-gray-500">{user?.email}</h2>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* All File Button */}
      <button className="w-full flex gap-2 justify-start bg-gray-50 hover:bg-gray-200 p-2 text-[14px] rounded-lg font-bold mt-8">
        <LayoutGrid className="h-5 w-5"/>
        All Files
      </button>
    </div>
  );
}

export default sidebarTopSection;
