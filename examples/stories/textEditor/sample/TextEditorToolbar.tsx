import { useState } from "react";
import { EditorIcon } from "./Icons";
import {
  BlockAPI,
  CursorAPI,
  useTextEditor,
  useTextEditorCursorState,
} from "@fewings/textEditor";
import { Popover } from "@fewings/react/components";

export default function TextEditorToolbar() {
  const editor = useTextEditor();
  const cursorStatus = useTextEditorCursorState();

  const [link, setLink] = useState("");
  const [linkRange, setLinkRange] = useState<Range | null>(null);

  const linkTargetText = linkRange?.startContainer.textContent?.slice(
    linkRange.startOffset,
    linkRange.endOffset
  );

  return (
    <div className={"editor_tools"}>
      <div className={"editor_tools_group"}>
        <button
          className={"editor_tools_item"}
          style={{ fontWeight: 700 }}
          onClick={() => editor?.action("heading", "h1")}
          data-active={cursorStatus?.isH1}
        >
          H1
        </button>
        <button
          className={"editor_tools_item"}
          style={{ fontWeight: 600 }}
          onClick={() => editor?.action("heading", "h2")}
          data-active={cursorStatus?.isH2}
        >
          H2
        </button>
        <button
          className={"editor_tools_item"}
          style={{ fontWeight: 600 }}
          onClick={() => editor?.action("heading", "h3")}
          data-active={cursorStatus?.isH3}
        >
          H3
        </button>
        <button
          className={"editor_tools_item"}
          style={{ fontWeight: 500 }}
          onClick={() => editor?.action("heading", "h4")}
          data-active={cursorStatus?.isH4}
        >
          H4
        </button>
        <button
          className={"editor_tools_item"}
          style={{ fontWeight: 500 }}
          onClick={() => editor?.action("heading", "h5")}
          data-active={cursorStatus?.isH5}
        >
          H5
        </button>
        <button
          className={"editor_tools_item"}
          style={{ fontWeight: 500 }}
          onClick={() => editor?.action("heading", "h6")}
          data-active={cursorStatus?.isH6}
        >
          H6
        </button>
      </div>
      <div className={"editor_tools_group"}>
        <button
          className={"editor_tools_item"}
          onClick={() => editor?.action("bold")}
          data-active={cursorStatus?.isBold}
        >
          <EditorIcon.Bold />
        </button>
        <button
          className={"editor_tools_item"}
          onClick={() => editor?.action("italic")}
          data-active={cursorStatus?.isItalic}
        >
          <EditorIcon.Italic />
        </button>
        <button
          className={"editor_tools_item"}
          onClick={() => editor?.action("underline")}
          data-active={cursorStatus?.isUnderline}
        >
          <EditorIcon.Underline />
        </button>

        <button
          className={"editor_tools_item"}
          onClick={() => editor?.action("removeStyle")}
        >
          <EditorIcon.RemoveStyle />
        </button>
      </div>
      <div className={"editor_tools_group"}>
        <button
          className={"editor_tools_item"}
          onClick={() => editor?.action("strikethrough")}
          data-active={cursorStatus?.isStrikethrough}
        >
          <EditorIcon.Strikethrough />
        </button>
        <select
          style={{
            width: 60,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          value={cursorStatus?.blockFontSize}
          className={"editor_tools_item"}
          onChange={(e) => {
            const v = e.target.value;
            const block = BlockAPI.getCurrentCursorBlock();
            if (block) {
              block.style.fontSize = v;
            }
          }}
        >
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="20px">20</option>
          <option value="22px">22</option>
          <option value="24px">24</option>
          <option value="26px">26</option>
          <option value="28px">28</option>
        </select>
        <label className={"editor_tools_item"}>
          <input
            type="color"
            className={"colorInput"}
            value={cursorStatus?.color?.slice(0, 7)}
            onChange={(e) => {
              editor?.action("color", e.target.value);
            }}
          ></input>
          <div
            style={{
              width: 24,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EditorIcon.ArrowDown />
          </div>
        </label>
        <label className={"editor_tools_item"}>
          <input
            type="color"
            className={"colorInput"}
            value={cursorStatus?.bgColor?.slice(0, 7)}
            onChange={(e) => {
              editor?.action("bgColor", e.target.value);
            }}
          ></input>
          <div
            style={{
              width: 24,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EditorIcon.ArrowDown />
          </div>
        </label>
      </div>
      <div className={"editor_tools_group"}>
        <button
          className={"editor_tools_item"}
          onClick={() => editor?.action("unorderedList")}
          data-active={cursorStatus?.isUnorderedList}
        >
          <EditorIcon.UnorderedList />
        </button>
        <button
          className={"editor_tools_item"}
          onClick={() => editor?.action("orderedList")}
          data-active={cursorStatus?.isOrderedList}
        >
          <EditorIcon.OrderedList />
        </button>
        <button
          className={"editor_tools_item"}
          onClick={() => editor?.action("alignLeft")}
          data-active={cursorStatus?.isAlignLeft}
        >
          <EditorIcon.AlignLeft />
        </button>
        <button
          className={"editor_tools_item"}
          onClick={() => editor?.action("alignCenter")}
          data-active={cursorStatus?.isAlignCenter}
        >
          <EditorIcon.AlignCenter />
        </button>
        <button
          className={"editor_tools_item"}
          onClick={() => editor?.action("alignRight")}
          data-active={cursorStatus?.isAlignRight}
        >
          <EditorIcon.AlignRight />
        </button>
      </div>
      <div className={"editor_tools_group"}>
        <Popover.Root>
          <Popover.Trigger>
            <button
              className={"editor_tools_item"}
              data-active={!!cursorStatus?.link}
              onClick={() => {
                if (cursorStatus?.link) {
                  setLink(cursorStatus.link);
                  const linkEl = cursorStatus.curElements.find(
                    (e) => e.tagName === "A"
                  )!;
                  const r = CursorAPI.createRangeFromElementTextNode(linkEl);
                  setLinkRange(r);
                } else {
                  setLinkRange(CursorAPI.getRange());
                  setLink("");
                }
              }}
            >
              <EditorIcon.Link />
            </button>
          </Popover.Trigger>
          <Popover.Panel anchor="bottom-right">
            <div className={"linkPopover"}>
              {linkRange && <div>Text : {linkTargetText}</div>}
              <div className={"linkInput"}>
                <input
                  type="text"
                  placeholder="Enter link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <button
                  className="editor_tools_item"
                  style={{
                    height: 32,
                  }}
                  onClick={() => {
                    if (linkRange) {
                      CursorAPI.setRange(linkRange);
                      editor?.action("link", link);
                      setLinkRange(null);
                    }
                  }}
                >
                  Attach
                </button>
              </div>
            </div>
          </Popover.Panel>
        </Popover.Root>
      </div>
    </div>
  );
}
