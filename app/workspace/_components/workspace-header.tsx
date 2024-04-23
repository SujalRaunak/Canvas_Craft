import { Link } from "lucide-react";
import React from "react";

function WorkspaceHeader() {
  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div className="flex items-center">
        <span className="font-bold text-2xl text-red-600">Canvas</span>
        <span className="font-bold text-2xl text-sky-600">Craft</span>
      </div>

      <button className="flex items-center justify-center px-2 py-1 transition rounded-md text-white font-medium h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700">Share <Link className="h-4 w-4"/> </button>
    </div>

  );
}

export default WorkspaceHeader;
