import {TMenuItem} from '../Menu/Menu';
import s from './MenuFour.module.scss'
import React, {useEffect} from 'react';
import {transform} from "sucrase";
import clsx from "clsx";


type MenuFourProps = {}

export default function MenuFour({}: MenuFourProps) {

  let root: HTMLUListElement;

  if (typeof window !== 'undefined') {
    root = document?.createElement('ul')
  }


  const tree = (items: TMenuItem[]) => {
    items.forEach((item) => {
      if (item.children) {
        if (typeof window !== 'undefined') {
          let tmp = document.createElement('ul')
          tmp.id = item.name
          root.appendChild(tmp)
        }
      } else {
        if (typeof window !== 'undefined') {
          let tmp = document.createElement('li')
          tmp.id = item.name
          //tmp.appendChild(item.component)
          root.appendChild(tmp)
        }
      }
    })
  }

  //tree(menuMock)

  const [current, setCurrent] = React.useState<number>(0)

  let level = 0


  // useEffect(() => {
  //   console.log('🍒', current)
  // }, [current])

  function ListItem({item, level}: any) {
    let children = null;
    if (item.values && item.values.length) {
      level++
      children = (
        <ul
          style={{
            transform: `translate3d(${100 * level}px, 0, 0)`,
            textWrap: 'nowrap'
          }}
          className={clsx(s.List, s.red)}
          data-level={level}
        >
          {item.values.map((i: any) => (
            <ListItem item={i} key={i.id} level={level}/>
          ))}
        </ul>
      );
    }

    return (
      <>
        <li className={clsx(s.ListItem)}>
          {item.name}
        </li>
        {children && (
          <li
            className={clsx(s.ListItem)}
            onClick={(e) => {
              e.stopPropagation()
              console.log(level)
            }}
          >
            {children}
          </li>
        )}
      </>
    );
  }


  return (
    <div>
      <h1 className='font-bold pb-2'>Four menu</h1>
      <ul
        style={{position: 'relative'}}
        data-level={level}
        onClick={(e) => {
          e.stopPropagation()
          console.log(level)
          setCurrent(level + 1)
        }}
      >
        {items.map((item, idx) => (
          <ListItem item={item} key={idx} level={level}/>
        ))}
      </ul>
    </div>
  )
}

const items = [
  {
    id: 1,
    name: "Root 1",
    values: [
      {
        id: 2,
        name: "Folder 11",
        values: [
          {
            id: 3,
            name: "SubFolder 111"
          },
          {
            id: 4,
            name: "SubFolder 112",
            values: []
          }
        ]
      },
      {
        id: 5,
        name: "Folder 12",
        values: [
          {
            id: 6,
            name: "SubFolder 121"
          },
          {
            id: 7,
            name: "SubFolder 122",
            values: []
          }
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Root 2",
    values: [
      {
        id: 2,
        name: "Folder 21",
        values: [
          {
            id: 3,
            name: "SubFolder 211"
          },
          {
            id: 4,
            name: "SubFolder 212",
            values: [
              {
                id: 3,
                name: "SubFolder 2121"
              },
              {
                id: 4,
                name: "SubFolder 2122",
                values: []
              }
            ]
          }
        ]
      },
      {
        id: 5,
        name: "Folder 22",
        values: [
          {
            id: 6,
            name: "SubFolder 221"
          },
          {
            id: 7,
            name: "SubFolder 222",
            values: []
          }
        ]
      }
    ]
  }
];

const menuMock: TMenuItem[] = [
  {
    name: 'Category',
    children: [
      {
        name: 'Clothes and shoes',
        children: [
          {
            name: 'Men',
            children: [
              {
                name: 'Men Shoes 1',
                component: <p>Men Shoes 1</p>
              }, {
                name: 'Men Shoes 2',
                component: <p>Men Shoes 2</p>
              }, {
                name: 'Men Shoes 3',
                component: <p>Men Shoes 3</p>
              },
            ]
          },
          {
            name: 'Women',
            children: [
              {
                name: 'Women Shoes 1',
                component: <p>Men Shoes 1</p>
              }, {
                name: 'Women Shoes 2',
                component: <p>Men Shoes 2</p>
              }, {
                name: 'Women Shoes 3',
                component: <p>Men Shoes 3</p>
              },
            ]
          },
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