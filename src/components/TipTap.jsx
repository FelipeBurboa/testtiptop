import "./TipTap.css";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

const MenuBar = ({ editor }) => {
  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full mx-auto justify-between flex border  border-gray-300 rounded p-2 mb-2">
      <button
        onClick={addImage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add image
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? "is-active" : ""}
      >
        highlight
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      >
        left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        right
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}
      >
        justify
      </button>
    </div>
  );
};

const TipTap = () => {
  const [editorContent, setEditorContent] = useState("Comienza a escribir!");

  const editor = useEditor({
    content: "Comienza a escribir!",
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <div className="w-full mx-auto justify-between flex rounded p-2">
        <div>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="mr-2 border border-gray-300 rounded p-2"
          >
            Undo
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="mr-2 border border-gray-300 rounded p-2"
          >
            Redo
          </button>
          <button
            onClick={() => editor.chain().focus().clearContent().run()}
            className="border border-gray-300 rounded p-2"
          >
            Clear
          </button>
        </div>
        <div>
          <button className="border border-gray-300 rounded p-2">
            Guardar
          </button>
        </div>
      </div>
      <div className="w-full mx-auto justify-between flex rounded p-2 mt-2 bg-gray-200 flex-col gap-2">
        <div className="border border-blue-700">
          <p className="ml-2">Content:</p>
          <p className="ml-2">{editorContent}</p>
        </div>
        <div className="border border-blue-700">
          <p className="ml-2">HTML:</p>
          <p className="ml-2">{editor?.getHTML()}</p>
        </div>
        <div className="border border-blue-700">
          <p className="ml-2">JSON:</p>
          <p className="ml-2">{JSON.stringify(editor?.getJSON())}</p>
        </div>
      </div>
    </div>
  );
};

export default TipTap;
