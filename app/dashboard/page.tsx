"use client";

import { api } from "@/convex/_generated/api";
import { useConvex, useMutation, useQuery } from "convex/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const convex = useConvex();

  const user = session?.data?.user;

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
      <>
        <div className="flex justify-center items-center gap-10">
          <p>Dashboard</p>
          <button
            onClick={() => signOut()}
            className="py2 px-4 bg-black text-white border rounded-lg"
          >
            Logout
          </button>
        </div>
      </>
    );
  }
}

export default Dashboard;
