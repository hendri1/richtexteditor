import { useState, useCallback } from 'react'
import { Editor, BaseEditor, createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'
import isHotkey from 'is-hotkey'

import MarkButton from '../molecules/MarkButton'
import BlockButton from '../molecules/BlockButton'
import Toolbar from '../molecules/Toolbar'

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const isMarkActive = (
  editor: BaseEditor & ReactEditor & HistoryEditor,
  format: string
) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const toggleMark = (
  editor: BaseEditor & ReactEditor & HistoryEditor,
  format: string
) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const Element = ({ attributes, children, element }: any) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const RichTextEditor = () => {
  const [editor] = useState(() => withReact(createEditor()))
  const renderElement = useCallback(
    (
      props: JSX.IntrinsicAttributes & {
        attributes: any
        children: any
        element: any
      }
    ) => <Element {...props} />,
    []
  )
  const renderLeaf = useCallback(
    (
      props: JSX.IntrinsicAttributes & {
        attributes: any
        children: any
        leaf: any
      }
    ) => <Leaf {...props} />,
    []
  )

  return (
    <div className="w-1/2 bg-white border">
      <Slate editor={editor} value={initialValue}>
        <Toolbar>
          <MarkButton format="bold" icon="bold" />
          <MarkButton format="italic" icon="italic" />
          <MarkButton format="underline" icon="underline" />
          <BlockButton format="code" icon="code" />
          <BlockButton format="quote" icon="quote" />
          <BlockButton format="left" icon="left" />
          <BlockButton format="center" icon="center" />
          <BlockButton format="right" icon="right" />
          <BlockButton format="justify" icon="justify" />
        </Toolbar>
        <div className="p-4">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some rich text…"
            onKeyDown={(event: any) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault()
                  const mark = HOTKEYS[hotkey]
                  toggleMark(editor, mark)
                }
              }
            }}
          />
        </div>
      </Slate>
    </div>
  )
}

export default RichTextEditor
