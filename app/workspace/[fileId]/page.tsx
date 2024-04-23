import React from 'react'
import WorkspaceHeader from '../_components/workspace-header';
import Editor from '../_components/editor';
function Workspace() {
  return (
    <div>
        <WorkspaceHeader/>

        {/* // Workspace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* // Document section */}
        <div className="h-screen">
            <Editor/>
        </div>
        {/* // Canvas section */}
        <div className="bg-red-400 h-screen">
            Canvas
        </div>
      </div>
    </div>
  )
}

export default Workspace;