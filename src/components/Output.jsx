import "./TipTap.css";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }
};

const Output = ({ content }) => {
  const [editorContent, setEditorContent] = useState(content);

  const editor = useEditor({
    content: editorContent,
    editable: false,
    extensions: [
      StarterKit,
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Output;
