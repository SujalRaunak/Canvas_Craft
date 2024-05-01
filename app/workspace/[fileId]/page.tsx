"use client"

import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/workspace-header';
import Editor from '../_components/editor';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FileInterface } from '@/app/dashboard/_components/fileList';
import Canvas from '../_components/canvas';
function Workspace({params}: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData,setFileData]=useState<FileInterface|any>();

  useEffect(()=>{
    console.log("FILEID",params.fileId)
    params.fileId&&getFileData();
   },[])

   const getFileData=async()=>{
    const result=await convex.query(api.files.getFileById,{_id:params.fileId})
    setFileData(result);
  }


  return (
    <div>
        <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)}/>

        {/* // Workspace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* // Document section */}
        <div className="h-screen">
            <Editor onSaveTrigger={triggerSave} fileId={params.fileId} fileData={fileData}/>
        </div>
        {/* // Canvas section */}
        <div className="h-screen bg-gray-400 border-l">
        <Canvas
             onSaveTrigger={triggerSave}
             fileId={params.fileId}
             fileData={fileData}
            />
        </div>
      </div>
    </div>
  )
}

export default Workspace;