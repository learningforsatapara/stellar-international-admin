import React from "react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { useEditor, EditorContent } from "@tiptap/react";

export const ReadOnlyText = ({ content }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Blockquote,
      HorizontalRule,
      Color,
      TextStyle,
    ],
    editable: false,
    content,
  });

  // 👇 Keep editor in sync with new content
  React.useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content, false); // false = don't emit update
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="mb-3 text-start">
      <EditorContent editor={editor} />
    </div>
  );
};
