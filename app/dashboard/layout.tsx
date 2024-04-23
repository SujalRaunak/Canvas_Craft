"use client"

import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Sidebar from "./_components/sidebar";
import { FileListContext } from "@/app/_context/file-list-context";

function dashboardlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const router = useRouter();
    const session = useSession();
    const convex = useConvex();
    const user = session?.data?.user;

    const [fileList_, setFileList_] = useState();

    useEffect(() => {
        user && checkTeam();
    }, [user]);

    const checkTeam = async () => {
        const result = await convex.query(api.teams.getTeam, {email: user?.email});

        if(!result?.length){
            router.push('teams/create');
        }
    }

  return (
    <>
    <FileListContext.Provider value={{fileList_, setFileList_}}>
      <div className="grid grid-cols-4">
        <div className="h-screen w-64 fixed">
          <Sidebar/>
        </div>

        <div className="col-span-4 ml-72">
      {children}
        </div>
      </div>
      </FileListContext.Provider>
      </>
  );
}

export default dashboardlayout;
