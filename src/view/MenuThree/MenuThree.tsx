import s from './MenuThree.module.scss'
import SlideMenu from "@/src/components/SlideMenu/SlideMenu";


type MenuThreeProps = {}

export default function MenuThree({}: MenuThreeProps) {

  const menuItems = [
    {
      value: "Fashion",
      igd: "dfds",
      items: [
        {
          value: "Boys",
          igd: "dfds",
          items: [{ value: "Shirts",ifd: "dfds", }, { value: "Pants",igd: "dfds", }]
        },
        { value: "Girls",id: "dfds", },
        { value: "Kids",id: "dfds", }
      ]
    },
    { value: "Electronics", items: [] },
    { value: "Food" },
    { value: "Mobile phones" }
  ];
  const animation = ["slideIn", "slideOut"];

  const thisIsFunction = (item: any) => {
    console.log(item);
  };

  return (
    <div className={'p-5'}>
      <SlideMenu
        data={menuItems}
        animation={animation}
        backgroundColor="#79a002"
        onClick={thisIsFunction}
      />
    </div>
  )
}