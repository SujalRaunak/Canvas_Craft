"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

function Dashboard() {
  const session = useSession();
  const router = useRouter();

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
