// @ts-nocheck
import React, {useCallback, useMemo} from 'react'
import {Editable, withReact, useSlate, Slate} from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from 'slate'
import {withHistory} from 'slate-history'

import {Button, Toolbar} from './common/components'
import {Icon} from './common/Icon'
import s from './SlateEditor.module.scss'

const LIST_TYPES = ['numbered-list', 'bulleted-list']

type TSlateEditor = {
  onChange: (value: [
    {
      type: 'paragaph',
      children: [{ text: '' }],
    },
  ]) => void
  defaultValue: Descendant[];
}

const SlateEditor = ({onChange, defaultValue}: TSlateEditor) => {
  const renderElement = useCallback((props: any) => <Element {...props} />, [])
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate editor={editor} initialValue={defaultValue} onChange={onChange}>
      <Toolbar>
        <MarkButton format="bold" icon="format_bold"/>
        <MarkButton format="italic" icon="format_italic"/>
        <MarkButton format="underline" icon="format_underlined"/>
        <BlockButton format="numbered-list" icon="format_list_numbered"/>
        <BlockButton format="bulleted-list" icon="format_list_bulleted"/>
      </Toolbar>
      <Editable
        className={s.Editor}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
      />
    </Slate>
  )
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })
  let newProperties: Partial<SlateElement>
  // if (TEXT_ALIGN_TYPES.includes(format)) {
  //   newProperties = {
  //     align: isActive ? undefined : format,
  //   }
  // } else {
  newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  // }
  Transforms.setNodes<SlateElement>(editor, newProperties)

  if (!isActive && isList) {
    const block = {type: format, children: []}
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format, blockType = 'type') => {
  const {selection} = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  )

  return !!match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const Element = ({attributes, children, element}) => {
  const style = {textAlign: element.align}
  switch (element.type) {
    case 'bulleted-list':
      return (
        <ul className={s.BulletedList} style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol className={s.NumberedList} style={style} {...attributes}>
          {children}
        </ol>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
}

const Leaf = ({attributes, children, leaf}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const BlockButton = ({format, icon}) => {
  const editor = useSlate()

  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        'type'
        // TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon icon={icon}/>
      {/*<Icon>{icon}</Icon>*/}
    </Button>
  )
}

const MarkButton = ({format, icon}) => {
  const editor = useSlate()

  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon icon={icon}/>
      {/*<Icon>{icon}</Icon>*/}
    </Button>
  )
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {text: ''}
    ],
  }
]

export default SlateEditor