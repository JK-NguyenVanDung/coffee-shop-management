
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import MyPagination from "../../../components/Pagination";
import { Input, Carousel } from "antd";
// import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
// import { actions } from "../../../redux";
import "./index.scss"
import Slider from "react-slick";

import Coffee from "../../assets/img/coffee_test.png";
import CurrencyFormat from 'react-currency-format';

let menuItem = {
    name: "Cafe sữa",
    url: "https://www.acouplecooks.com/wp-content/uploads/2021/09/Almond-Milk-Coffee-001.jpg",
    recipe: "110g bột cà phê + 100ml nước nóng pha phin, sau đó thêm vào 10ml nước đường và 15ml sữa đặc",
    price: 21000,
    total_sales: 12,
    type: "Đồ uống",
    create_date:"30/06/2022",
    update_by: "dung001" 
}
export const MenuItem = ({item}) =>{
    

    return(<div className="meunItemsCont">
        <div className="itemCont" style={{backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 30%),url(${item.url})` } }>
            <span>{item.name}</span> 
            <span>{ new Intl.NumberFormat("vi-VI", {
          style: "currency",
          currency: "VND",
        }).format(parseInt(item.price))}</span> 
         </div>

    </div>)
}
export const MenuList = ({menuItems, categoryName}) =>{
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

    return(
        <div class="menuCont">
            <h2> {categoryName}</h2>
            <div className="meunItemCont"> 
        <Slider {...settings}>            
            <MenuItem item={menuItem}/>
            <MenuItem item={menuItem}/>
            <MenuItem item={menuItem}/>
            <MenuItem item={menuItem}/>
            <MenuItem item={menuItem}/>
            <MenuItem item={menuItem}/>
            <MenuItem item={menuItem}/>
            </Slider >

</div>
        </div>
)
}
export const CategoryItem = ()=>{
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
    return(
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

export const ComponentCarousel = ({children, onChange}) =>{
    const props = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return(    
        <div>

<Carousel afterChange= {onChange} {...props}>

    {children}
</Carousel>
       
        </div> )
    
}
export default function Menu() {

    const onChange = (currentSlide) => {
        console.log(currentSlide);
      };
    
    return(<div className="container">
    <CategoryItem/>
    <ComponentCarousel onChange={onChange}> <MenuList categoryName={"Cà phê"}/> </ComponentCarousel>

    </div>)

}

