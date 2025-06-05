"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";

type Props = {
  content: string;
  onChange: (value: string) => void;
};

export default function TextEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      BulletList,
      OrderedList,
      ListItem,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <>
      {/* Editor wrapper */}
      <div className="border rounded-md p-3 min-h-[200px] max-w-full overflow-hidden border-red-300 focus-within:ring-2 focus-within:ring-red-400 transition">
        <MenuBar editor={editor} />
        <EditorContent
          editor={editor}
          className="ProseMirror min-h-[150px] max-w-full outline-none"
        />
      </div>

      {/* Inline styles for .ProseMirror content */}
      <style jsx global>{`
        .ProseMirror {
          white-space: pre-wrap;
          word-break: break-word;
          min-height: 150px;
          max-width: 100%;
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5em;
          white-space: normal;
          word-break: break-word;
          max-width: 100%;
        }
        .ProseMirror li {
          white-space: normal;
          word-break: break-word;
        }
      `}</style>
    </>
  );
}

function MenuBar({ editor }: { editor: Editor }) {
  if (!editor) return null;

  const baseBtnClasses =
    "px-3 py-1 rounded border transition-colors duration-150 select-none";

  // Updated red theme button classes
  const btnClass = (active: boolean) =>
    active
      ? "bg-red-600 text-white border-red-600"
      : "bg-white text-red-700 border-red-300 hover:bg-red-100";

  return (
    <div className="mb-3 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${baseBtnClasses} ${btnClass(editor.isActive("bold"))}`}
        aria-label="Bold"
        title="Bold"
      >
        <b>B</b>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${baseBtnClasses} ${btnClass(editor.isActive("italic"))}`}
        aria-label="Italic"
        title="Italic"
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${baseBtnClasses} ${btnClass(editor.isActive("underline"))}`}
        aria-label="Underline"
        title="Underline"
      >
        <u>U</u>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${baseBtnClasses} ${btnClass(editor.isActive("bulletList"))}`}
        aria-label="Bullet List"
        title="Bullet List"
      >
        &bull; List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${baseBtnClasses} ${btnClass(editor.isActive("orderedList"))}`}
        aria-label="Ordered List"
        title="Ordered List"
      >
        1. List
      </button>

      {/* Color picker */}
      <input
        type="color"
        value={editor.getAttributes("textStyle").color || "#000000"}
        onInput={(e) =>
          editor
            .chain()
            .focus()
            .setColor((e.target as HTMLInputElement).value)
            .run()
        }
        className="w-10 h-6 cursor-pointer rounded border border-red-300 p-0"
        title="Text Color"
        aria-label="Text Color"
      />
    </div>
  );
}
