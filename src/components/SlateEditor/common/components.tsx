import React, {ReactNode, Ref, PropsWithChildren, forwardRef, LegacyRef} from 'react'
import ReactDOM from 'react-dom'
import s from './components.module.scss'
import clsx from "clsx";

interface BaseProps {
  className: string

  [key: string]: unknown
}

type OrNull<T> = T | null

// eslint-disable-next-line react/display-name
export const Button = forwardRef(
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
      ref={ref as Ref<HTMLSpanElement>}
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

// eslint-disable-next-line react/display-name
export const Menu = forwardRef(
  (
    {className, ...props}: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div {...props} data-test-id="menu" ref={ref as Ref<HTMLDivElement>} className={clsx(className, s.Menu)}/>
  )
)

export const Portal = ({children}: { children?: ReactNode }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null
}
// eslint-disable-next-line react/display-name
export const Toolbar = forwardRef(
  (
    {className, ...props}: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <Menu {...props} ref={ref as Ref<HTMLDivElement>} className={clsx(className, s.Toolbar)}/>
  )
)