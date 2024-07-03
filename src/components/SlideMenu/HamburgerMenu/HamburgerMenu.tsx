import {MouseEvent} from "react"

type HamburgerMenuProps = {
  style?: string
  color?: string
  lineColor?: string
  showItemsHandler: (event: MouseEvent<HTMLDivElement>) => void
}

export default function HamburgerMenu({style, showItemsHandler, color, lineColor}: HamburgerMenuProps) {
  return (
    <div
      className={`burger-menu ${style}`}
      onClick={showItemsHandler}
      style={{backgroundColor: color}}
    >
      <div className="line" style={{backgroundColor: lineColor}}/>
      <div className="line" style={{backgroundColor: lineColor}}/>
      <div className="line" style={{backgroundColor: lineColor}}/>
    </div>
  );
}

// HamBurgerMenu.propTypes = {
//   showItemsHandler: PropTypes.func.isRequired,
//   color: PropTypes.string.isRequired,
//   style: PropTypes.string.isRequired,
//   lineColor: PropTypes.string.isRequired
// };