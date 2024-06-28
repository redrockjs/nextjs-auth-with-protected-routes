import s from './MenuBis.module.scss'
import React, {ReactElement, ReactNode, SVGProps, useEffect, useState} from "react";
import {usePrevious} from "@uidotdev/usehooks";
import clsx from "clsx";

type MenuBisProps = {}

export type TMenuItem = {
  name: string;
  component?: ReactNode;
  children?: TMenuItem[];
};

export default function MenuBis({}: MenuBisProps) {
  const [show, setShow] = useState(false);
  const [level, setLevel] = useState<number>(0);
  const [block, setBlock] = useState<string>('0');
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
    items.forEach(item => {
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

  tree(menuMock)

  const Tree = ({items}: { items: TMenuItem[] }) => {
    return items.map((item, idx) => {
      if (item.children) {
        return (
          <div key={idx} className={s.List}>
            <div className={s.ListItem}>{item.name}</div>
            <Tree items={item.children}/>
          </div>
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
              setBlock(previousBlock)
            }}/>}
          </div>
          <h2 className={s.Sidebar__Title}>
            {level === 0 && <div>Заголовок</div>}
            {level > 0 && (
              <div onClick={() => {
                setLevel(level - 1)
                setBlock(previousBlock)
              }} style={{cursor: 'pointer'}}>
                Подзаголовок1
              </div>
            )}
          </h2>

          <ul className={s.List}>
            <Tree items={menuMock} />
          </ul>
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
          // {
          //   name: 'Men',
          //   children: [
          //     {
          //       name: 'Men Shoes 1',
          //       component: <p>Men Shoes 1</p>
          //     }, {
          //       name: 'Men Shoes 2',
          //       component: <p>Men Shoes 2</p>
          //     }, {
          //       name: 'Men Shoes 3',
          //       component: <p>Men Shoes 3</p>
          //     },
          //   ]
          // },
          // {
          //   name: 'Women',
          //   children: [
          //     {
          //       name: 'Women Shoes 1',
          //       component: <p>Men Shoes 1</p>
          //     }, {
          //       name: 'Women Shoes 2',
          //       component: <p>Men Shoes 2</p>
          //     }, {
          //       name: 'Women Shoes 3',
          //       component: <p>Men Shoes 3</p>
          //     },
          //   ]
          // },
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
      {
        name: 'Electronics and engineering',
        children: [
          {
            name: 'Electronics 1',
            component: <p>Electronics 1 </p>,
          },
          {
            name: 'Electronics 2',
            component: <p>Electronics 1 </p>,
          },
          {
            name: 'Electronics 3',
            component: <p>Electronics 1 </p>,
          },
          {
            name: 'Electronics 4',
            component: <p>Electronics 1 </p>,
          },
          {
            name: 'Electronics 5',
            component: <p>Electronics 1 </p>,
          },
          {
            name: 'Electronics 6',
            component: <p>Electronics 1 </p>,
          },
          {
            name: 'Electronics 7',
            component: <p>Electronics 1 </p>,
          },
        ],
      }
    ],
  },
  {
    name: 'Price',
    children: [
      {
        name: 'price under 10',
        component: <p>Under $10 </p>,
      },
      {
        name: 'price 10-30',
        component: <p>Under $10-30 </p>,
      },
      {
        name: 'price 30-50',
        component: <p>Under $30-50 </p>,
      },
      {
        name: 'price 50-100',
        component: <p>Under $50-100 </p>,
      },
      {
        name: 'price over 100',
        component: <p>Over $100 </p>,
      },
    ],
  },
  {
    name: 'Rating',
    component: (
      <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
        <p>Rating above 4.5 </p>
        <p>Rating above 4.2 </p>
        <p>Rating above 4.0 </p>
      </div>
    ),
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