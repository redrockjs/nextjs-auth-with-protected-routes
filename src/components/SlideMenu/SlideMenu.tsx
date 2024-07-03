import s from './SlideMenu.module.scss'
import {useEffect, useRef, useState} from "react";
import HamburgerMenu from './HamburgerMenu/HamburgerMenu';
import MenuItems from './MenuItems/MenuItems';

type SlideMenuProps = {
  data?: any
  backgroundColor?: string
  textColor?: string
  iconColor?: string
  hamBurgerClassName?: string
  className?: string
  animation?: string[]
  menuContainerWidth?: string | number
  onClick?: Function
}

export default function SlideMenu(
  {
    data = [{value: 'No data found'}],
    backgroundColor = '#525252',
    textColor = 'white',
    iconColor = 'white',
    hamBurgerClassName,
    className,
    animation = ['slideIn', 'slideOut'],
    menuContainerWidth = 300,
    onClick
  }: SlideMenuProps) {

  const [showMenuItems, changeShowMenuItems] = useState(false);

  function handleClickOutside(event: any, ref: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      changeShowMenuItems(false);
    }
  }

  const menubarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener('mousedown', event =>
      handleClickOutside(event, menubarRef)
    );
    return () => {
      document.removeEventListener('mousedown', event =>
        handleClickOutside(event, menubarRef)
      );
    };
  });

  const generateBack = (passedData: any, level: any) => {
    if (level > 0 && passedData[0].value !== 'back') {
      passedData.unshift({
        value: 'back'
      });
    }
    for (let i = 0; i < passedData.length; i += 1) {
      if (passedData[i].items && passedData[i].items.length > 0) {
        generateBack(passedData[i].items, (level += 1));
      }
    }
  };
  generateBack(data, 0);

  const showItemsHandler = (event: any) => {
    event.stopPropagation();
    changeShowMenuItems(!showMenuItems);
  };

  const closeItemsHandler = () => {
    changeShowMenuItems(false);
  };

  return (
    <div
      className={`menu ${className}`}
      ref={menubarRef}
      onClick={closeItemsHandler}
      style={{display: 'inline-block'}}
    >
      <HamburgerMenu
        showItemsHandler={showItemsHandler}
        color={backgroundColor}
        style={hamBurgerClassName}
        lineColor={iconColor}
      />

      <MenuItems
        showMenuItems={showMenuItems}
        animation={animation}
        Data={data}
        color={backgroundColor}
        textColor={textColor}
        width={menuContainerWidth}
        onClick={onClick}
        closeMenu={closeItemsHandler}
      />
    </div>
  )
}

// MenuBar.defaultProps = {
//   data: [
//     {
//       value: 'No data found'
//     }
//   ],
//   animation: ['slideIn', 'slideOut'],
//   backgroundColor: '#4dccc4',
//   textColor: 'white',
//   iconColor: 'white',
//   menuContainerWidth: 300,
//   className: '',
//   hamBurgerClassName: '',
//   onClick: null
// };
//
// MenuBar.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.shape({})),
//   animation: PropTypes.arrayOf(PropTypes.string),
//   backgroundColor: PropTypes.string,
//   textColor: PropTypes.string,
//   menuContainerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   hamBurgerClassName: PropTypes.string,
//   iconColor: PropTypes.string,
//   className: PropTypes.string,
//   onClick: PropTypes.func
// };