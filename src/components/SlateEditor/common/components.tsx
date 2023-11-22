// @ts-nocheck
import React, {ReactNode, Ref, PropsWithChildren} from 'react'
import ReactDOM from 'react-dom'
import {cx, css} from '@emotion/css'
import s from './components.module.scss'

interface BaseProps {
  className: string

  [key: string]: unknown
}

type OrNull<T> = T | null

export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean
        reversed: boolean
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <span
      {...props}
      ref={ref}
      style={{
        cursor: 'pointer',
        color:
          reversed ? active
              ? 'white'
              : '#aaa'
            : active
              ? 'black'
              : '#ccc'
      }}
      className={className}
    />
  )
)

export const Menu = React.forwardRef(
  (
    {className, ...props}: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div {...props} data-test-id="menu" ref={ref} className={cx(className, s.Menu)}/>
  )
)

export const Portal = ({children}: { children?: ReactNode }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null
}

export const Toolbar = React.forwardRef(
  (
    {className, ...props}: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <Menu {...props} ref={ref} className={cx(className, s.Toolbar)}/>
  )
)