import { Editor, BaseEditor, Transforms, Element as SlateElement } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import { HistoryEditor } from 'slate-history'

import Icon from '../atoms/Icon'

const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const isBlockActive = (
  editor: BaseEditor & ReactEditor & HistoryEditor,
  format: string,
  blockType = 'type'
) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  )

  return !!match
}

const toggleBlock = (
  editor: BaseEditor & ReactEditor & HistoryEditor,
  format: string
) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })

  let newProperties: Partial<SlateElement>

  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : format,
    }
  }

  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const BlockButton = ({ format, icon }: { [key: string]: string }) => {
  const editor = useSlate()
  return (
    <button
      className={`mr-1 ${
        isBlockActive(
          editor,
          format,
          TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
        )
          ? 'text-blue-500'
          : 'text-black'
      }`}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon icon={icon} />
    </button>
  )
}

export default BlockButton
