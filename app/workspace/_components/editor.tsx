"use client"

import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from '@editorjs/checklist';
// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import RawTool from '@editorjs/raw';
// @ts-ignore
import Warning from '@editorjs/warning';
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { FileInterface } from '@/app/dashboard/_components/fileList';

const rawDocument={
    "time" : 1550476186479,
    "blocks" : [{
        data:{
            text:'Document Name',
            level:2
        },
        id:"123",
        type:'header'
    },
    {
      data:{
          level:4
      },
      id:"1234",
      type:'header'
  },
    ],
    "version" : "2.8.1"
}

function Editor({onSaveTrigger,fileId,fileData}:{onSaveTrigger:any,fileId:any,fileData:FileInterface}) {

    const ref = useRef<EditorJS>();
    const updateDocument=useMutation(api.files.updateDocument);
    const [document, setDcoument] = useState(rawDocument);
    useEffect(() => {
        fileData&&initEditor();
    }, [fileData]);

    useEffect(()=>{
      console.log("trigger Value:",onSaveTrigger);
      onSaveTrigger && onSaveDocument();
    },[onSaveTrigger]);

    const initEditor= () => {
        const editor = new EditorJS({
            /**
             * Id of Element that should contain Editor instance
             */
             
            tools: { 
              header: {
                class: Header,
                shortcut: 'CMD+SHIFT+H',
                config:{
                    placeholder:'Enter a Header'
                }
              },
                list: List,
                raw: RawTool,
                paragraph: Paragraph,
                warning: Warning,
                quote: {
                    class: Quote,
                    inlineToolbar: true,
                    shortcut: 'CMD+SHIFT+O',
                    config: {
                      quotePlaceholder: 'Enter a quote',
                      captionPlaceholder: 'Quote\'s author',
                    },
                  },
                  checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                  }, 
                  list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    }
                },
                embed: {
                    class: Embed,
                    config: {
                      services: {
                        youtube: true,
                        coub: true
                      }
                    }
                  },
              }, 
              
            holder: 'editorjs',
            data: fileData?.document?JSON.parse(fileData.document):rawDocument
          });
          ref.current=editor;
    }

    const onSaveDocument = () => {
        if(ref.current) {
          ref.current.save().then((outputData) => {
            console.log('Article data: ', outputData)
            updateDocument({
              _id: fileId,
              document: JSON.stringify(outputData)
            }).then(res => {
                toast('Document updated!');
            }, (e) => {
              toast('Error while updating document');
            })
          }).catch((error) => {
            console.log('Saving failed: ', error)
          });
        }
    }
  return (
    <div>
        <div id='editorjs' className='ml-2'>

        </div>
    </div>
  )
}

export default Editor;