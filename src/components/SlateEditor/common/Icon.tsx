import React from 'react';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatListNumbered,
  MdFormatListBulleted
} from 'react-icons/md'

const iconList = {
  format_bold: <MdFormatBold size={20}/>,
  format_italic: <MdFormatItalic size={20}/>,
  format_underlined: <MdFormatUnderlined size={20}/>,

  format_list_numbered: <MdFormatListNumbered size={20}/>,
  format_list_bulleted: <MdFormatListBulleted size={20}/>,
}

export const Icon = ({icon}: { icon: string }) => {

  return <>
    {
      icon === 'format_bold'
        ? <MdFormatBold size={20}/>
        : icon === 'format_italic'
          ? <MdFormatItalic size={20}/>
          : icon === 'format_underlined'
            ? <MdFormatUnderlined size={20}/>
            : icon === 'format_list_numbered'
              ? <MdFormatListNumbered size={20}/>
              : icon === 'format_list_bulleted'
                ? <MdFormatListBulleted size={20}/>
                : ''
    }
  </>
}