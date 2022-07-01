import React, { useEffect, useState } from "react";
import  './styles.scss';

import {menuText} from "../../helper/Text"

import {Switch,Input} from 'antd';

const { Search } = Input;


const MenuHeader = ()=>{
    function onSearch(){

    }
    return(<div className="centeredCont">
            <Switch checkedChildren={menuText.switchOp1} unCheckedChildren={menuText.switchOp2} defaultChecked />
        <Search placeholder={menuText.searchMenu}   allowClear       size="large"
  className="menuSearch"

  style={{borderRadius: '10px'}}

      onSearch={onSearch}
      />
    </div>)
  }

 export default MenuHeader;