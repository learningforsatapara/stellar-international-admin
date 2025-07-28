import { useEffect, useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import { Button, ColorPicker, Select, Tooltip } from "antd";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { EditorContent, useEditor } from "@tiptap/react";

import "./style.scss";

// Assets
import svg from "../assets/svg";

const { Option } = Select;

const getActiveStyle = (editor) => {
  if (!editor) return "";
  // Check for heading levels first
  for (let level = 1; level <= 6; level++) {
    if (editor.isActive("heading", { level })) {
      return level;
    }
  }
  // Check for paragraph
  if (editor.isActive("paragraph")) {
    return "paragraph";
  }
  return "";
};

const transformText = (editor, type, activeTransform, setActiveTransform) => {
  const { selection } = editor.state;
  const selectedText = editor.state.doc.textBetween(
    selection.from,
    selection.to,
    " "
  );

  // Toggle: if current transform is active, undo it
  if (activeTransform === type) {
    editor.commands.insertContentAt(
      { from: selection.from, to: selection.to },
      selectedText
    );
    setActiveTransform(null);
    return;
  }

  let transformed = selectedText;

  if (type === "uppercase") transformed = selectedText.toUpperCase();
  if (type === "lowercase") transformed = selectedText.toLowerCase();
  if (type === "capitalize")
    transformed = selectedText.replace(/\b\w/g, (c) => c.toUpperCase());

  editor.commands.insertContentAt(
    { from: selection.from, to: selection.to },
    transformed
  );
  setActiveTransform(type);
};

const TiptapEditorBlock = ({ item, onChange, onRemove }) => {
  const [activeTransform, setActiveTransform] = useState(null);
  const [color, setColor] = useState("#000000");

  const editor = useEditor({
    content: item.content,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Blockquote,
      HorizontalRule,
      Color,
      TextStyle,
    ],

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && item.content !== editor.getHTML()) {
      editor.commands.setContent(item.content);
    }
  }, [item.content, editor]);

  const handleColorChange = (newColor) => {
    const hex =
      typeof newColor === "string" ? newColor : newColor.toHexString();
    setColor(hex);
    editor.chain().focus().setColor(hex).run();
  };

  if (!editor) return null;

  return (
    <div className="editor-block">
      <div className="editor-toolbar">
        <Tooltip title="Bold" arrow rootClassName="editor-tooltip">
          <Button
            className={`tooltip-button ${
              editor.isActive("bold") ? "active" : ""
            }`}
            onClick={() => editor.chain().focus().toggleBold().run()}
            type={editor.isActive("bold") ? "primary" : "default"}
          >
            {svg?.bold}
          </Button>
        </Tooltip>
        <Tooltip title="Italic" arrow rootClassName="editor-tooltip">
          <Button
            className={`tooltip-button ${
              editor.isActive("italic") ? "active" : ""
            }`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            type={editor.isActive("italic") ? "primary" : "default"}
          >
            {svg?.italic}
          </Button>
        </Tooltip>
        <Tooltip title="Underline" arrow rootClassName="editor-tooltip">
          <Button
            className={`tooltip-button ${
              editor.isActive("underline") ? "active" : ""
            }`}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            type={editor.isActive("underline") ? "primary" : "default"}
          >
            {svg?.underline}
          </Button>
        </Tooltip>
        <Tooltip title="Align left" arrow rootClassName="editor-tooltip">
          <Button
            type={
              editor.isActive({ textAlign: "left" }) ? "primary" : "default"
            }
            className={`tooltip-button ${
              editor.isActive({ textAlign: "left" }) ? "active" : ""
            }`}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            {svg?.textAlignLeft}
          </Button>
        </Tooltip>
        <Tooltip title="Align center" arrow rootClassName="editor-tooltip">
          <Button
            type={
              editor.isActive({ textAlign: "center" }) ? "primary" : "default"
            }
            className={`tooltip-button ${
              editor.isActive({ textAlign: "center" }) ? "active" : ""
            }`}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            {svg?.textAlignCenter}
          </Button>
        </Tooltip>
        <Tooltip title="Align right" arrow rootClassName="editor-tooltip">
          <Button
            type={
              editor.isActive({ textAlign: "right" }) ? "primary" : "default"
            }
            className={`tooltip-button ${
              editor.isActive({ textAlign: "right" }) ? "active" : ""
            }`}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            {svg?.textAlignEnd}
          </Button>
        </Tooltip>
        <Tooltip title="Align justify" arrow rootClassName="editor-tooltip">
          <Button
            type={
              editor.isActive({ textAlign: "justify" }) ? "primary" : "default"
            }
            className={`tooltip-button ${
              editor.isActive({ textAlign: "justify" }) ? "active" : ""
            }`}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            {svg?.textAlignJustify}
          </Button>
        </Tooltip>
        <Tooltip title="UPPERCASE" arrow rootClassName="editor-tooltip">
          <Button
            className={`tooltip-button ${
              activeTransform === "uppercase" ? "active" : ""
            }`}
            type={activeTransform === "uppercase" ? "primary" : "default"}
            onClick={() =>
              transformText(
                editor,
                "uppercase",
                activeTransform,
                setActiveTransform
              )
            }
          >
            {svg?.uppercase}
          </Button>
        </Tooltip>
        <Tooltip title="lowercase" arrow rootClassName="editor-tooltip">
          <Button
            className={`tooltip-button ${
              activeTransform === "lowercase" ? "active" : ""
            }`}
            type={activeTransform === "lowercase" ? "primary" : "default"}
            onClick={() =>
              transformText(
                editor,
                "lowercase",
                activeTransform,
                setActiveTransform
              )
            }
          >
            {svg?.lowercase}
          </Button>
        </Tooltip>
        <Tooltip title="Capitalize" arrow rootClassName="editor-tooltip">
          <Button
            className={`tooltip-button ${
              activeTransform === "capitalize" ? "active" : ""
            }`}
            type={activeTransform === "capitalize" ? "primary" : "default"}
            onClick={() =>
              transformText(
                editor,
                "capitalize",
                activeTransform,
                setActiveTransform
              )
            }
          >
            {svg?.capitalize}
          </Button>
        </Tooltip>
        <Tooltip title="Style" arrow rootClassName="editor-tooltip">
          <Select
            value={getActiveStyle(editor)}
            style={{ width: 120 }}
            onChange={(value) => {
              if (value === "paragraph") {
                editor.chain().focus().setParagraph().run();
              } else {
                editor.chain().focus().toggleHeading({ level: value }).run();
              }
            }}
            placeholder="Select"
          >
            {[1, 2, 3, 4, 5, 6].map((lvl) => (
              <Option key={lvl} value={lvl}>
                Heading {lvl}
              </Option>
            ))}
            <Option key="paragraph" value="paragraph">
              Paragraph
            </Option>
          </Select>
        </Tooltip>
        <Tooltip title="Bullet list" arrow rootClassName="editor-tooltip">
          <Button
            className={`tooltip-button ${
              editor.isActive("bulletList") ? "active" : ""
            }`}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            type={editor.isActive("bulletList") ? "primary" : "default"}
          >
            {svg?.bullet}
          </Button>
        </Tooltip>
        <Tooltip title="Number list" arrow rootClassName="editor-tooltip">
          <Button
            className={`tooltip-button ${
              editor.isActive("orderedList") ? "active" : ""
            }`}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            type={editor.isActive("orderedList") ? "primary" : "default"}
          >
            {svg?.number}
          </Button>
        </Tooltip>
        <Tooltip title="Blockquote" arrow rootClassName="editor-tooltip">
          <Button
            className={`tooltip-button ${
              editor.isActive("blockquote") ? "active" : ""
            }`}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            type={editor.isActive("blockquote") ? "primary" : "default"}
          >
            {svg?.quote}
          </Button>
        </Tooltip>
        <Tooltip
          title="Divider(Horizontal Rule)"
          arrow
          rootClassName="editor-tooltip"
        >
          <Button
            className={`tooltip-button`}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            {svg?.horizontal}
          </Button>
        </Tooltip>
        <Tooltip title="Text Color" arrow rootClassName="editor-tooltip">
          <ColorPicker
            value={color}
            onChange={handleColorChange}
            format="hex"
          />
        </Tooltip>
      </div>

      <EditorContent editor={editor} className="tiptap-editor shadow-sm" />
    </div>
  );
};

export default TiptapEditorBlock;
