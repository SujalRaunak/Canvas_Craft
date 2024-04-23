"use client"

import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Sidebar from "./_components/sidebar";

function dashboardlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const router = useRouter();
    const session = useSession();
    const convex = useConvex();
    const user = session?.data?.user;

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
      <div className="grid grid-cols-4">
        <div>
          <Sidebar/>
        </div>

        <div className="grid-col-3">
      {children}
        </div>
      </div>
      </>
  );
}

export default dashboardlayout;
