import {RightArrow} from "../Assets/RightArrow";

type MenuItemProps = {
  item: Record<string, string>
  nextValue: boolean
  moveToNext: Function
  textColor: string
}

export default function MenuItem({item, nextValue, moveToNext, textColor}: MenuItemProps) {
  return (
    <div className="menuItem" onClick={() => moveToNext(item)}>
      <p className="value">{item.value}</p>
      <p className="nextArrow" style={{display: nextValue ? 'block' : 'none'}}>
        <RightArrow color={textColor}/>
      </p>
    </div>
  );
}

// MenuItem.propTypes = {
//   item: PropTypes.shape({}).isRequired,
//   nextValue: PropTypes.bool.isRequired,
//   moveToNext: PropTypes.func.isRequired,
//   textColor: PropTypes.string.isRequired
// };
