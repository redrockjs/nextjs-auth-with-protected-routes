import s from './MenuTwo.module.scss'
import React, {ReactNode, SVGProps, useEffect, useState} from "react";
import {usePrevious} from "@uidotdev/usehooks";
import clsx from "clsx";

type MenuTwoProps = {}

export type TMenuItem = {
  name: string;
  component?: ReactNode;
  children?: TMenuItem[];
};

export default function MenuTwo({}: MenuTwoProps) {
  const [show, setShow] = useState(false);
  const [level, setLevel] = useState<number>(0);
  const [block, setBlock] = useState<string>('1');
  const previousBlock = usePrevious(block);

  const handleClose = () => {
    setShow(false);
  }

  useEffect(() => {
    console.log(level, block)
  }, [level, block]);

  const width = 360
  let levelT = 0

  const tree = (items: TMenuItem[]) => {
    items?.forEach(item => {
      if (item.children) {
        levelT++
        console.log('🍒 parent ' + item.name + ` level ${levelT}`);
        tree(item.children);
        levelT--;
      } else {
        console.log('☑', item.name);
      }
    });
  };

  const Tree = ({items}: { items: TMenuItem[] }) => {
    return items.map((item, idx) => {
      if (item.children) {
        return (
          <>
            <div key={idx} className={s.List}>
              <div className={s.ListItem}>{item.name}</div>
            </div>
            <Tree items={item.children}/>
          </>
        );
      } else {
        return (
          <div key={idx} className={s.ListItem}>
            {item.component}
          </div>
        );
      }
    });
  };

  tree()

  return (
    <>
      <button className={s.OpenBtn} onClick={() => setShow(!show)}>
        Open
      </button>

      <div className={clsx(s.Overlay, show && s.Overlay_show)}
        // onClick={(e) => {
        //   e.stopPropagation()
        //   setShow(false)
        // }}
      >
        <div className={clsx(s.Sidebar, show && s.Sidebar_show)}>
          <div className={s.Sidebar__Toggle}>
            {level === 0 && <CloseIcon style={{cursor: 'pointer'}} onClick={handleClose}/>}
            {level > 0 && <BackIcon style={{cursor: 'pointer'}} onClick={() => {
              setLevel(level - 1);
              setBlock(block.slice(0,-1))
            }}/>}
          </div>
          <h2 className={s.Sidebar__Title}>
            {level === 0 && <div>Заголовок</div>}
            {level > 0 && (
              <div onClick={() => {
                setLevel(level - 1)
                setBlock(block.slice(0,-1))
              }} style={{cursor: 'pointer'}}>
                Подзаголовок1
              </div>
            )}
          </h2>


          <nav className={s.Nav}>
            <div
              className={s.MenuItem}
              data-level={1}
              style={{transform: `translateX(${
                  block === '1'
                    ? level > 0
                      ? -360
                      : level < 0
                        ? 360 : 0
                    : level > 0 ? -360 : 360
                }px)`}}
              onClick={() => {setLevel(prev => prev + 1); setBlock('11')}}
            >
              Menu 1
            </div>

            <div
              className={s.MenuItem}
              data-level={2}
              style={{transform: `translateX(${
                  block === '11'
                    ? level > 1
                      ? -360
                      : level < 1
                        ? 360 : 0
                    : level > 1 ? -360 : 360
                }px)`}}
              onClick={() => {setLevel(prev => prev + 1); setBlock('111')}}
            >
              SubMenu 11
            </div>

            <div
              className={s.MenuItem}
              style={{transform: `translateX(${
                  block === '111'
                    ? level > 2
                      ? -360
                      : level < 2
                        ? 360 : 0
                    : level > 2 ? -360 : 360
                }px)`}}
            >
              Component 111
            </div>
          </nav>

        </div>
      </div>
    </>
  )
}

const menuMock: TMenuItem[] = [
  {
    name: 'Category',
    children: [
      {
        name: 'Clothes and shoes',
        children: [
          {
            name: 'Shoes 1',
            component: <p>Shoes 2</p>
          },
          {
            name: 'Shoes 2',
            component: <p>Shoes 2</p>
          },
          {
            name: 'Shoes 3',
            component: <p>Shoes 3</p>
          },
          {
            name: 'Shoes 4',
            component: <p>Shoes 4</p>
          },
          {
            name: 'Shoes 5',
            component: <p>Shoes 5</p>
          },
        ],
      },
    ],
  },
];


const CloseIcon = ({...props}: SVGProps<SVGSVGElement>) => (
  <svg {...props} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.42969 1.92871L18.5725 19.0716" stroke="#233038" strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round"/>
    <path d="M18.5725 1.92871L1.42969 19.0716" stroke="#233038" strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round"/>
  </svg>

)

const BackIcon = ({...props}: SVGProps<SVGSVGElement>) => (
  <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 6L9 12L15 18" stroke="#233038" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const NextIcon = ({...props}: SVGProps<SVGSVGElement>) => (
  <svg {...props} width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 5.5L15 12.5L9 19.5" stroke="#1A1A1A" strokeOpacity="0.9" strokeWidth="1.7037" strokeLinecap="round"
          strokeLinejoin="round"/>
  </svg>

)