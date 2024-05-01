import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FileInterface } from "@/app/dashboard/_components/fileList";
function Canvas({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FileInterface;
}) {
  const [whiteBoardData, setWhiteBoardData] = useState<any>();

  const updateWhiteboard = useMutation(api.files.updateWhiteboard);
  useEffect(() => {
    onSaveTrigger && saveWhiteboard();
  }, [onSaveTrigger]);
  const saveWhiteboard = () => {
    updateWhiteboard({
      _id: fileId,
      whiteboard: JSON.stringify(whiteBoardData),
    }).then((resp) => console.log(resp));
  };
  return (
    <div style={{ height: "770px" }}>
      {fileData && (
        <Excalidraw
          theme="light"
          initialData={{
            elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
          }}
          onChange={(excalidrawElements, appState, files) =>
            setWhiteBoardData(excalidrawElements)
          }
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.MenuHint />
            <WelcomeScreen.Hints.ToolbarHint />
          </WelcomeScreen>
        </Excalidraw>
      )}
    </div>
  );
}

export default Canvas;
