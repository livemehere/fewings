import { useState } from 'react';
import {
  TextEditorBody,
  TextEditorProvider,
  TextEditorView,
} from '@fewings/text-editor';
import TextEditorToolbar from './TextEditorToolbar';
import { Space } from '@fewings/react/components';

const initialHtml = `<div data-block-id="w1u2oultf"><h1>Heading 1</h1></div><div data-block-id="72ayknhj3" class=""><h2>Heading 2</h2></div><div data-block-id="nv5h7fnv6"><h3>Heading 3</h3></div><div data-block-id="dcseiu6no" class=""><h4>Heading 4</h4></div><div data-block-id="ydqr863di"><h5>Heading 5</h5></div><div data-block-id="vcfuv0hdr" class=""><h6>Heading 6</h6></div><div data-block-id="uvuciklzq" class=""><b>Bold</b> <i>Italic</i> <u>Underline</u> <strike>Strikethrogh</strike> <font color="#fd6d6d">textColor</font> <span style="background-color: rgb(242, 253, 88);">bgColor</span></div><div data-block-id="xxwk311oa" class="">list</div><div data-block-id="fq3a66wha" class=""><ul><li>item</li><li>item</li><ul><li>item</li><ul><li>item</li></ul></ul></ul></div><div data-block-id="abmevumeg" class=""><br></div><div data-block-id="0ptli6mwq" class="">order list</div><div data-block-id="e53lr7u8q" class=""><ol><li>item</li><li>item</li><ol><li>item</li><li>item</li></ol></ol></div><div data-block-id="5am4rg6mo" class="" style="text-align: center;">center</div><div data-block-id="v8y5zle3u" class="" style="text-align: right;">end</div><div data-block-id="ck0n1yl0i" class=""><a href="https://google.com">Link</a></div><div data-block-id="xo4g9yuju" class=""><br></div>`;

interface Props {
  mode?: 'edit' | 'view';
  spellcheck?: boolean;
  showPreview?: boolean;
}

export default function SampleTextEditor({
  mode,
  spellcheck,
  showPreview,
}: Props) {
  const [preview, setPreview] = useState(initialHtml);
  return (
    <div>
      <TextEditorProvider
        onChange={setPreview}
        initialHtml={initialHtml}
        mode={mode}
        spellcheck={spellcheck}
      >
        <div className="editor_layout">
          <TextEditorToolbar />
          <TextEditorBody style={{ height: 400, overflowY: 'scroll' }} />
        </div>
      </TextEditorProvider>
      <Space y={20} />
      {showPreview && <TextEditorView html={preview} className="preview" />}
    </div>
  );
}
