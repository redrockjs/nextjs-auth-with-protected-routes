// @ts-nocheck

import {SlateEditor} from "@/src/components";
import {useEffect, useState} from "react";
import {Descendant} from "slate";
import escapeHtml from 'escape-html';
import {Text} from 'slate';


export function SlateEditorView() {

  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    let editorLS = window.localStorage.getItem('editor')

    console.log(editorLS)
    editorLS
      ? setValue(JSON.parse(editorLS))
      : setValue(initialValue)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('editor', JSON.stringify(value))
  }, [value, setValue]);

  let output = serialize({
    children: [...value]
  })
  console.log(value)
  console.log(output)

  return (
    <div>
      <h2 className={'font-bold text-3xl pb-4'}>
        Slate
      </h2>

      <SlateEditor onChange={setValue} defaultValue={value}/>

      <p style={{margin: '20px 0'}}>
        dangerouslySetInnerHTML example
      </p>
      <div style={{width: '500px', height: '200px', background: '#DDD', color: '#000'}}
           dangerouslySetInnerHTML={{
             __html: output
           }}
      />

    </div>
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

export const serialize = node =>{
  if(Text.isText(node)){
    return getMarked(node, escapeHtml(node.text));
  }
  const children = node.children.map(n => serialize(n)).join('')

  return getBlock({children,element:node})
}

export const getMarked = (leaf,children) =>{
  if (leaf.bold) {
    children = `<strong>${children}</strong>`
  }
  if (leaf.italic) {
    children = `<em>${children}</em>`
  }
  if (leaf.underline) {
    children = `<u>${children}</u>`
  }
  return children;
}

export const getBlock = (props) => {
  const {element,children} = props;

  switch(element.type){
    case 'list-item':
      return  `<li>${children}</li>`
    case 'numbered-list':
      return `<ol>${children}</ol>`
    case 'bulleted-list':
      return `<ul>{children}</ul>`
    case 'paragraph':
       return `<p>${children}</p>`
    default :
      return `<div>${children}</div>`
  }
}