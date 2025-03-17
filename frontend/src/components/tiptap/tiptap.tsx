"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextStyle from "@tiptap/extension-text-style";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Toolbar from "./toolbar";

type Props = {
  description: string;
  onChange: (richText: string) => void;
};

const Tiptap = ({ description, onChange }: Props) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Subscript,
      Superscript,
      TextStyle,

      TaskList,
      TaskItem.configure({
        HTMLAttributes: {
          class: "flex items-center",
        },
      }),

      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "rounded-md border p-3 min-h-[150px] ring-1 focus:ring-offset-2 ring-gray-300",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent className="border-none prose max-w-none" editor={editor} />
      <style jsx global>{`
        .ProseMirror h1 {
          font-size: 2.5em;
          margin-top: 0.7em;
          margin-bottom: 0.5em;
        }
        .ProseMirror h2 {
          font-size: 2.2em;
          margin-top: 0.6em;
          margin-bottom: 0.4em;
        }
        .ProseMirror h3 {
          font-size: 2em;
          margin-top: 0.5em;
          margin-bottom: 0.3em;
        }
        .ProseMirror h4 {
          font-size: 1.8em;
          margin-top: 0.4em;
          margin-bottom: 0.2em;
        }
        .ProseMirror h5 {
          font-size: 1.5em;
          margin-top: 0.3em;
          margin-bottom: 0.2em;
        }
        .ProseMirror p {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
          line-height: 1.6;
        }
        .ProseMirror a {
          color: #2563eb;
          text-decoration: underline;
        }
        .ProseMirror a:hover {
          color: #1e40af;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5em;
        }
        .ProseMirror ul {
          list-style-type: disc;
        }
        .ProseMirror ol {
          list-style-type: decimal;
        }
      `}</style>
    </div>
  );
};

export default Tiptap;
