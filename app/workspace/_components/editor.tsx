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
    }],
    "version" : "2.8.1"
}

function Editor() {

    const ref = useRef<EditorJS>();
    const [document, setDcoument] = useState(rawDocument);
    useEffect(() => {
        initEditor();
    }, [])
    const initEditor= () => {
        const editor = new EditorJS({
            /**
             * Id of Element that should contain Editor instance
             */
             
            tools: { 
                header: Header, 
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
            data: document
          });
          ref.current=editor;
    }
  return (
    <div>
        <div id='editorjs' className='ml-6'>

        </div>
    </div>
  )
}

export default Editor;