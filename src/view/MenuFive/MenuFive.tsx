import s from './MenuFive.module.scss'
import {ReactNode, SVGProps, useState} from "react";
import clsx from "clsx";
import {itemsMock} from "@/src/view/MenuFive/items";

type MenuFiveProps = {}

type TMenuItem = {
  name: string;
  component?: ReactNode;
  children?: TMenuItem[];
}

export default function MenuFive({}: MenuFiveProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  function ListItem({item}: { item: TMenuItem }) {
    let childrenNode = null;
    const [open, setOpen] = useState(false)

    const handleShow = () => setOpen(true)
    const handleHide = () => setOpen(false)

    if (item.children && item.children.length) {
      childrenNode = (
        <li className={s.ListItem}>
          <p onClick={handleShow}>{item.name}</p>
          <div className={clsx(s.Level, open && s.Level_active)}>

            <p className={s.BackBtn} onClick={handleHide}> {item.name} </p>

            <ul className={s.List}>
              {item.children.map((childItem, idx) => (
                <ListItem item={childItem} key={idx}/>
              ))}
            </ul>
          </div>
        </li>
      );
    }

    return (
      <>
        {childrenNode === null
          ? <li className={s.ListItem}> {item.component ?? item.name} </li>
          : childrenNode
        }
      </>
    );
  }

  return (
    <div>
      <h2 className={'py-8 font-bold text-2xl'}>Menu Five</h2>

      <button className={s.OpenBtn} onClick={() => setShow(!show)}>
        Open
      </button>

      <div className={clsx(s.Overlay, show && s.Overlay_show)}>
        <div className={clsx(s.Sidebar, show && s.Sidebar_show)}>
          <div className={s.Sidebar__Header}>
            <CloseIcon className={s.Sidebar__CloseIcon} onClick={handleClose}/>
            Filter
          </div>
          <nav className={s.Menu}>
            <div className={s.Level}>
              <ul className={s.List}>
                {itemsMock.map((item, idx) => (
                  <ListItem item={item} key={idx}/>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>

    </div>
  )
}

const CloseIcon = ({...props}: SVGProps<SVGSVGElement>) => (
  <svg {...props} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.42969 1.92871L18.5725 19.0716" stroke="#233038" strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round"/>
    <path d="M18.5725 1.92871L1.42969 19.0716" stroke="#233038" strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round"/>
  </svg>
)
