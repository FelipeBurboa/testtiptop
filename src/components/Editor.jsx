import "./TipTap.css";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useState, useCallback } from "react";
import { createPost } from "../services/api.post.services";

const MenuBar = ({ editor }) => {
  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    let url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    if (url.startsWith("www.")) {
      url = `https://${url}`;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center gap-2 mb-2">
      <div className="flex gap-1">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="bg-slate-500 hover:bg-slate-700 text-white font-semibold py-1 px-2 rounded"
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="bg-slate-500 hover:bg-slate-700 text-white font-semibold py-1 px-2 rounded"
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="bg-slate-500 hover:bg-slate-700 text-white font-semibold py-1 px-2 rounded"
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className="bg-slate-500 hover:bg-slate-700 text-white font-semibold py-1 px-2 rounded"
        >
          Párrafo
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="bg-slate-800 hover:bg-black text-white font-semibold py-1 px-2 rounded"
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="bg-slate-800 hover:bg-black text-white font-semibold py-1 px-2 rounded"
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="bg-slate-800 hover:bg-black text-white font-semibold py-1 px-2 rounded"
        >
          Tachar
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className="bg-slate-800 hover:bg-black text-white font-semibold py-1 px-2 rounded"
        >
          Destacar
        </button>
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="bg-violet-500 hover:bg-violet-700 text-white font-semibold py-1 px-2 rounded"
        >
          Izquierda
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="bg-violet-500 hover:bg-violet-700 text-white font-semibold py-1 px-2 rounded"
        >
          Centro
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="bg-violet-500 hover:bg-violet-700 text-white font-semibold py-1 px-2 rounded"
        >
          Derecha
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className="bg-violet-500 hover:bg-violet-700 text-white font-semibold py-1 px-2 rounded"
        >
          Justificar
        </button>
        <button
          onClick={addImage}
          className="bg-teal-500 hover:bg-teal-700 text-white font-semibold py-1 px-2 rounded"
        >
          Imagen
        </button>
        <button
          onClick={setLink}
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-1 px-2 rounded"
        >
          Linkear
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          className="bg-red-500 hover:bg-red-800 text-white font-semibold py-1 px-2 rounded"
        >
          Deslinkear
        </button>
      </div>
    </div>
  );
};

const Editor = ({ refetch }) => {
  const [editorContent, setEditorContent] = useState("Comienza a escribir!");

  const handleCreatePost = async (e) => {
    e.preventDefault();
    await createPost({ content: editorContent })
      .then(() => {
        alert("Post creado con exito");
        refetch();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const editor = useEditor({
    content: "Comienza a escribir!",
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
    extensions: [
      StarterKit,
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <div className="w-full mx-auto justify-between flex rounded p-2 ">
        <div>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="mr-2 border border-gray-300 rounded p-2 bg-blue-400 text-white hover:bg-blue-600 font-bold"
          >
            Deshacer
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="mr-2 border border-gray-300 rounded p-2 bg-blue-400 text-white hover:bg-blue-600 font-bold"
          >
            Rehacer
          </button>
          <button
            onClick={() => editor.chain().focus().clearContent().run()}
            className="border border-gray-300 rounded p-2 bg-blue-400 text-white hover:bg-blue-600 font-bold"
          >
            Limpiar
          </button>
        </div>
        <div>
          <button
            className="border border-gray-300 rounded p-2 bg-blue-500 text-white hover:bg-blue-700 font-bold"
            onClick={handleCreatePost}
          >
            Guardar
          </button>
        </div>
      </div>
      {/*Esto se puede descomentar para ver como esta saliendo el texto, es como para debuggear*/}
      <div className="w-full mx-auto justify-between flex rounded p-2 mt-2 bg-gray-200 flex-col gap-2">
        <h1 className="text-3xl font-bold text-center">Contenido del editor</h1>
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

export default Editor;
