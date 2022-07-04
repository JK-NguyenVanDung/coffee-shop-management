
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Input, Carousel } from "antd";
import { useAppDispatch, useAppSelector } from "../../hook/useRedux"
import { actions } from "../../redux";
import "./index.scss"

import Slider from "react-slick";
import { useDoubleTap } from 'use-double-tap';

import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Coffee from "../../assets/img/coffee_test.png";
import WoodBoard from "../../assets/img/wood.svg";
import Clipboard from "../../assets/img/clipboard.svg";
import Clipper from "../../assets/img/clipper.svg";
let orderItem = {
  id: '01',
  name: "Cafe sữa",
  url: "https://www.acouplecooks.com/wp-content/uploads/2021/09/Almond-Milk-Coffee-001.jpg",
  recipe: "110g bột cà phê + 100ml nước nóng pha phin, sau đó thêm vào 10ml nước đường và 15ml sữa đặc",
  price: 21000,
  amount: 1,
  total_sales: 12,
  type: "Đồ uống",
};
let menuItem = {
  id: 1,
  name: "Cafe sữa",
  url: "https://www.acouplecooks.com/wp-content/uploads/2021/09/Almond-Milk-Coffee-001.jpg",
  recipe: "110g bột cà phê + 100ml nước nóng pha phin, sau đó thêm vào 10ml nước đường và 15ml sữa đặc",
  price: 21000,
  amount: 1,
  total_sales: 12,
  type: "Đồ uống",
  create_date: "30/06/2022",
  update_by: "dung001"
}
let menuItem2 = {
  id: 2,
  name: "Cafe sữa đá",
  url: "https://www.acouplecooks.com/wp-content/uploads/2021/09/Almond-Milk-Coffee-001.jpg",
  recipe: "110g bột cà phê + 100ml nước nóng pha phin, sau đó thêm vào 10ml nước đường và 15ml sữa đặc",
  price: 21000,
  amount: 1,
  total_sales: 12,
  type: "Đồ uống",
  create_date: "30/06/2022",
  update_by: "dung001"
}

function numbToCurrency(price) {
  return new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(parseInt(price))
}
const OrderItem = ({ item }) => {
  let list = useAppSelector((state) => state.menu.orderList)
  const dispatch = useAppDispatch();

  const onRemove = () =>{
    dispatch(actions.menuActions.removeOrderItem(item));
    dispatch(actions.menuActions.resetOrderBar());

  }
  return (<div className="orderItemCont">
    <div className="orderItemImage " style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 30%),url(${item.url})` }} />
    <div className="infoCont">
      <span>{item.name + " x " + item.amount}</span>
      <span>{numbToCurrency(item.price)}</span>
    </div>
    <div className="smallRemoveBtnCont">
        <RemoveButton action={onRemove} />
      </div>
  </div>)
}
export const RemoveButton = ( props = {size:"medium",action: null})=>{
  return(<div>
       <IconButton  color="primary" aria-label="add an alarm" onClick={ props.action}>
          <CancelIcon fontSize={props.size} style={{zIndex: 10}}/>
        </IconButton>
  </div>)
} 


const OrderBar = () => {
  let visible = useAppSelector((state) => state.menu.show)
  let orderList = useAppSelector((state) => state.menu.orderList);
  let amount = useAppSelector((state) => state.menu.amount);
  let total = useAppSelector((state) => state.menu.total);

  const dispatch = useAppDispatch();
  function onRemove(){
    dispatch(actions.menuActions.closeOrderBar());
  }
  useEffect(()=>{
    dispatch(actions.menuActions.getBillData())
  },[orderList])
  let currentdate = new Date(); 
  let datetime = currentdate.getHours() + ":"  
                + currentdate.getMinutes() + " " + currentdate.getDate() + "/" +  (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() 
  return (
    <>
   {visible && (<div className="orderBarCont drop-shadow" style={{ backgroundImage: `url(${WoodBoard})` }} >
   {orderList.map(item => {
      return( <div>
        <OrderItem item={item} />
      </div>)
            })
    
    }
      <div className="clipboardCont">
        <div className="divider"></div>
        <div className="cbCont">
          <div className="clipboardImg " style={{ backgroundImage: `url(${Clipboard})` }}>

            <h2>Đơn mới</h2>
            <i>{datetime}</i>
            <div className="contentCont">
              <span>
                Số lượng: {amount}
              </span>
              <br/>
              <span>
                Tổng tiền: {numbToCurrency(total)}
              </span>
            </div>
            <Button variant="contained">Tạo đơn</Button>
          </div>
        </div>


      </div>
      <div className="removeBtnCont">
        <RemoveButton action  ={onRemove} size="large"/>
      </div>
    </div>)}
    </>)
}

export const MenuItem = ({ item }) => {
  const dispatch = useAppDispatch();
  let orderList = useAppSelector((state) => state.menu.orderList);

  const bind = useDoubleTap((event) => {
    // Your action here
    // let temp = item;
    // Object.defineProperty(temp, 'amount', {
    //    value: 1
    //  });
    //  let newList = orderList;
    //  newList.push(item) ;
        //  if(orderList.length <=0){
        //         Object.defineProperty(temp, 'amount', {
        //           value: 1
        //         })
        //         newList.push(temp);
        //   }else{
        //       newList = orderList.map((item)=>{
        //           if(temp.id === item.id){
        //               item.amount +=1;
        //           }else{
        //             Object.defineProperty(temp, 'amount', {
        //               value: 1
        //             })
        //               newList.push(temp);
        //           }
        //       })
        //   }

    dispatch(actions.menuActions.addOrderItem(item))

  });
  return (
    <div className="itemCont  drop-shadow" style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 30%),url(${item.url})` }}
      {...bind}
    >
      <span>{item.name}</span>
      <span>{numbToCurrency(item.price)}</span>

    </div>

  )
}
export const MenuList = ({categoryName }) => {
  let settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    arrows: true,
    cssEase: "ease-out",
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div class="menuCont">
      <h2> {categoryName}</h2>
      <div className="meunItemCont">
        <Slider {...settings}>
          <div className="meunItemsCont ">
            <MenuItem item={menuItem} />

          </div>
          <div className="meunItemsCont ">

          <MenuItem item={menuItem2} />
          </div>

        </Slider >

      </div>
    </div>
  )
}
export const CategoryItem = () => {
  let settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 4,
    arrows: true,
    cssEase: "ease-out",
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      <div className="categoryCont">
        <div className="cateItem selected">Cà phê sữa</div>
      </div>
      <div className="categoryCont">
        <div className="cateItem">Cà phê sữa</div>
      </div>
      <div className="categoryCont">
        <div className="cateItem">Cà phê sữa</div>
      </div>    <div className="categoryCont">
        <div className="cateItem">Cà phê sữa</div>
      </div>    <div className="categoryCont">
        <div className="cateItem">Cà phê sữa</div>
      </div>    <div className="categoryCont">
        <div className="cateItem">Cà phê sữa</div>
      </div>
      <div className="categoryCont">
        <div className="cateItem">Cà phê sữa</div>
      </div>    <div className="categoryCont">
        <div className="cateItem">Cà phê sữa</div>
      </div>    <div className="categoryCont">
        <div className="cateItem">Cà phê sữa</div>
      </div>    <div className="categoryCont">
        <div className="cateItem">Cà phê sữa</div>
      </div>    <div className="categoryCont">
        <div className="cateItem">Cà phê sữa</div>
      </div>    <div className="categoryCont">
        <div className="cateItem">Cà phê sữa</div>
      </div>    <div className="categoryCont">
        <div className="cateItem">Cà phê sữa</div>
      </div>    <div className="categoryCont">
        <div className="cateItem">Cà phê sữa</div>
      </div>    <div className="categoryCont">
        <div className="cateItem">Cà phê sữa</div>
      </div>

    </Slider>
  )
}
const { Search } = Input;

// export const ComponentCarousel = ({ children, onChange }) => {
//   const props = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1
//   };
//   return (
//     <div>

//       <Carousel afterChange={onChange} {...props}>

//         {children}
//       </Carousel>

//     </div>)

// }

const BillDetail = () => {
  let orderList = useAppSelector((state) => state.menu.orderList);

  return(
    <div class="billDetailCont">
      <img class="clipper" src={Clipper}/>
      <div className="billBgCont">
        <div className="billHeader">
        <h2>Linh's Coffee</h2>
        <h1>TẠO ĐƠN</h1>
        </div>
        <div>
        {/* {orderList.map(item =>{ */}
          <div className="billItemCont"> 
            <OrderItem item={orderItem} />
          </div>
        {/* })} */}
        </div>
     </div>
    </div>
  )
}
export default function Menu() {
  let dispatch = useAppDispatch();

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (<div className="container">
    <CategoryItem />
    <MenuList categoryName={"Cà phê"} />
    <OrderBar/>
    {/* <BillDetail/> */}
  </div>)

}

