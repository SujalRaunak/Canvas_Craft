"use client";

import { api } from "@/convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import DashHeader from "./_components/dashboard-header";
import FileList from "./_components/fileList";

function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const convex = useConvex();

  const user: any = session?.data?.user;

  // const getUser = useQuery(api.user.getUser, {email: user?.email});
  const createUser = useMutation(api.user.createUser);
  useEffect(() => {
      if(user) {
        checkUser();
      }
  }, [user]);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, {email: user?.email});
    if(!result?.length){
      createUser({
        name: user.name,
        email: user.email,
        image: user.image
      }).then(res => {
        console.log(res);
      })
    }
  }

  if (session.status === "unauthenticated") {
    router.push("/");
  }

  if (session.status === "authenticated") {
    return (
      <div className="p-8">
        <DashHeader/>

        <FileList/>
      </div>
    );
  }
}

export default Dashboard;
