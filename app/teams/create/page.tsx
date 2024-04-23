"use client"

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

function createTeam() {
  const [teamName, setTeamName] = useState("");
  const createTeam = useMutation(api.teams.createTeam);
  const session = useSession();
  const router = useRouter();

  const user: any = session?.data?.user;

  const createNewTeam = () => {
    createTeam({
      teamName: teamName,
      createdBy: user?.email
    }).then(res => {
      console.log(res);
      if(res) {
        router.push('/dashboard');
        // toast.success("Team created successfully!!");
      }
    })
  }
  return (
    <div className="min-h-screen bg-[#171717]">
      <div className="p-10">
        <span className="font-bold text-2xl text-red-600">Canvas</span>
        <span className="font-bold text-2xl text-sky-600">Craft</span>
      </div>

      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="font-extrabold text-4xl text-white">
          What should we call your team?
        </h1>
        <p className="mt-4 text-gray-500 font-semibold">
          You can always change this later from settings.
        </p>

        <form className="mt-8">
          <div className="p-8">
            <label htmlFor="">
              <div className="mb-2 flex items-start text-white font-medium">
                Team Name
              </div>
              <div>
                <div className="border border-gray-500 w-96 rounded-md">
                  <input
                    type="text"
                    placeholder="Team Name"
                    onChange={(e) => setTeamName(e.target.value)}
                    className="px-4 py-3 w-full rounded-md bg-[#242424] text-white border border-gray-500 font-light"
                  />
                </div>
              </div>
            </label>
          </div>
        </form>

        <div className="my-6 bg-blue-600 hover:bg-blue-700 transition w-72 text-center rounded-md">
          <button disabled={!(teamName&&teamName?.length>5)} onClick={() => createNewTeam()}  className="text-white w-full rounded-md p-4 disabled:bg-blue-500">
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
}

export default createTeam;
