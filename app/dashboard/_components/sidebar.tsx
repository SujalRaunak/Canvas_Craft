import React, { useContext, useEffect, useState } from "react";
import SidebarTopSection, { TeamInterface } from "./sidebar-top-section";
import SidebarBottomSection from "./sidebar-bottom-section";
import { useSession } from "next-auth/react";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getFiles } from "@/convex/files";
import { toast } from "@/components/ui/use-toast";
// import { FileListContext } from "@/app/_context/file-list-context";
function sidebar() {
  const session = useSession();

  const user = session?.data?.user;
  const [activeTeam, setActiveTeam] = useState<TeamInterface | any>();
  const convex = useConvex();
  const createFile = useMutation(api.files.createFile);
  const [totalFiles, setTotalFiles] = useState<Number>();
  // const { fileList_, setFileList_ } = useContext(FileListContext);

  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);

  const onFileCreate = (fileName: string) => {
    console.log(fileName);
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteboard: "",
    }).then(
      (resp) => {
        if (resp) {
          getFiles();
          toast("File created successfully!");
        }
      },
      (e) => {
        toast("Error while creating file");
      }
    );
  };

  return (
    <div className="bg-gray-100 h-screen w-72 border-r p-6 flex flex-col">
      <div className="flex-1">
        <SidebarTopSection user={user} />
      </div>

      <div>
        <SidebarBottomSection
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
        />
      </div>
    </div>
  );
}

export default sidebar;
