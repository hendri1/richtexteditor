import { Editor, BaseEditor } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import { HistoryEditor } from 'slate-history'

import Icon from '../atoms/Icon'

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

const MarkButton = ({ format, icon }: { [key: string]: string }) => {
  const editor = useSlate()
  return (
    <button
      className={`mr-1 ${
        isMarkActive(editor, format) ? 'text-blue-500' : 'text-black'
      }`}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon icon={icon} />
    </button>
  )
}

export default MarkButton
