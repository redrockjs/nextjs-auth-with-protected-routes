import s from './MenuFive.module.scss'
import React, {SVGProps, useState} from "react";
import clsx from "clsx";

type MenuFiveProps = {}

type ItemType = {
  name: string
  children: ItemType[]
}

export default function MenuFive({}: MenuFiveProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [showLevelOne, setShowLevelOne] = useState(false);
  const [showLevelTwo, setShowLevelTwo] = useState(false);


  function ListItem({item}: { item: ItemType }) {
    let childrenNode = null;
    if (item.children && item.children.length) {
      childrenNode = (
        // <ul>
        //   {item.children.map((childItem, idx) => (
        //     <ListItem item={childItem} key={idx}/>
        //   ))}
        // </ul>

        <li className="icon icon-arrow-left">
          <p>{item.name}</p>
          <div className="mp-level">
            <h2>{item.name}</h2>
            <a className="mp-back" href="#">back</a>
            <ul>
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
        <li><p>{item.name}</p></li>
        {childrenNode && (
          <li> {childrenNode} </li>
        )}
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
          <CloseIcon className={s.Sidebar__CloseIcon} onClick={handleClose}/>

          <nav id="mp-menu" className="mp-menu mp-level-open">
            <div className="mp-level">
              <h2>All Categories</h2>
              <ul>
                <li className="icon icon-arrow-left">
                  <p onClick={() => setShowLevelOne(true)}>Devices</p>
                  <div className="mp-level"
                       style={{transform: showLevelOne ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)'}}>
                    <h2>Devices</h2>
                    <p className="mp-back" onClick={() => setShowLevelOne(false)}>back</p>
                    <ul>
                      <li className="icon icon-arrow-left">
                        <p onClick={() => setShowLevelTwo(true)}>Mobile Phones</p>
                        <div className="mp-level"
                             style={{transform: showLevelTwo ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)'}}>
                          <h2>Mobile Phones</h2>
                          <p className="mp-back" onClick={() => setShowLevelTwo(false)}>back</p>
                          <ul>
                            <li><p>Super Smart Phone</p></li>
                            <li><p>Thin Magic Mobile</p></li>
                            <li><p>Performance Crusher</p></li>
                            <li><p>Futuristic Experience</p></li>
                          </ul>
                        </div>
                      </li>
                      <li className="icon icon-arrow-left">
                        <p>Televisions</p>
                        <div className="mp-level">
                          <h2>Televisions</h2>
                          <a className="mp-back" href="#">back</a>
                          <ul>
                            <li><p>Flat Superscreen</p></li>
                            <li><p>Gigantic LED</p></li>
                            <li><p>Power Eater</p></li>
                            <li><p>3D Experience</p></li>
                            <li><p>Classic Comfort</p></li>
                          </ul>
                        </div>
                      </li>
                      <li className="icon icon-arrow-left">
                        <p>Cameras</p>
                        <div className="mp-level">
                          <h2>Cameras</h2>
                          <a className="mp-back" href="#">back</a>
                          <ul>
                            <li><p>Smart Shot</p></li>
                            <li><p>Power Shooter</p></li>
                            <li><p>Easy Photo Maker</p></li>
                            <li><p>Super Pixel</p></li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="icon icon-arrow-left">
                  <p>Magazines</p>
                  <div className="mp-level mp-level-open">
                    <h2>Magazines</h2>
                    <a className="mp-back" href="#">back</a>
                    <ul>
                      <li><p>National Geographic</p></li>
                      <li><p>Scientific American</p></li>
                      <li><p>The Spectator</p></li>
                      <li><p>The Rambler</p></li>
                      <li><p>Physics World</p></li>
                      <li><p>The New Scientist</p></li>
                    </ul>
                  </div>
                </li>
                <li className="icon icon-arrow-left">
                  <p>Store</p>
                  <div className="mp-level">
                    <h2 className="icon icon-shop">Store</h2>
                    <a className="mp-back" href="#">back</a>
                    <ul>
                      <li className="icon icon-arrow-left">
                        <p>Clothes</p>
                        <div className="mp-level">
                          <h2>Clothes</h2>
                          <a className="mp-back" href="#">back</a>
                          <ul>
                            <li className="icon icon-arrow-left">
                              <p>Womens Clothing</p>
                              <div className="mp-level">
                                <h2>Womens Clothing</h2>
                                <a className="mp-back" href="#">back</a>
                                <ul>
                                  <li><p>Tops</p></li>
                                  <li><p>Dresses</p></li>
                                  <li><p>Trousers</p></li>
                                  <li><p>Shoes</p></li>
                                  <li><p>Sale</p></li>
                                </ul>
                              </div>
                            </li>
                            <li className="icon icon-arrow-left">
                              <p>Mens Clothing</p>
                              <div className="mp-level">
                                <h2>Mens Clothing</h2>
                                <a className="mp-back" href="#">back</a>
                                <ul>
                                  <li><p>Shirts</p></li>
                                  <li><p>Trousers</p></li>
                                  <li><p>Shoes</p></li>
                                  <li><p>Sale</p></li>
                                </ul>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li><p>Jewelry</p></li>
                      <li><p>Music</p></li>
                      <li><p>Grocery</p></li>
                    </ul>
                  </div>
                </li>
                <li><p>Collections</p></li>
                <li><p>Credits</p></li>
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
