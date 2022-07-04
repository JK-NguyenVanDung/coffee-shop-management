import { createSlice,current } from "@reduxjs/toolkit";


let orderItem = {
    id: '01',
    name: "Cafe sữa",
    url: "https://www.acouplecooks.com/wp-content/uploads/2021/09/Almond-Milk-Coffee-001.jpg",
    recipe: "110g bột cà phê + 100ml nước nóng pha phin, sau đó thêm vào 10ml nước đường và 15ml sữa đặc",
    price: 21000,
    amount: 1,
    total_sales: 12,
    type: "Đồ uống",
    VAT: 0.1
  };
let initialState = {
    openDetail: false,
    show: false,
    loadData: false,
    orderList: [],
    note: "",
    amount: 0,
    total: 0,
    payment_method: "cash",
    print_bill: true,
    menuGroup: "drink",
    
}
const slice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        showDetail(state) {
            state.openDetail = true;
        },
        closeDetail(state) {
            state.openDetail = false;
        },
        showOrderBar(state) {
            state.show = true;
        },
        closeOrderBar() {
            return initialState;       
         },
        resetOrderBar(state){
            if(state.orderList.length === 0){
                return initialState;
            }
        },
        setNameMenu(state, actions) {
            state.nameMenu = actions.payload
        },
        setGroup(state,actions){
          state.menuGroup = actions.payload
        },
        addOrderItem(state,actions){
            let temp = actions.payload;
            let exist = false;
            if(state.orderList.length > 0){
                state.orderList.map((item)=>{
                    if(temp.id === item.id){
                        item.amount +=1;
                        exist = true
                    }
                })
                                 
            }
            if(!exist){
                Object.defineProperty(temp, 'amount', {
                    value: 1
                })
                state.orderList.push(temp); 
            }
            
            state.show = true;

        },
        removeOrderItem(state,actions){
            let temp = actions.payload;
            if(state.orderList.length > 0){
                state.orderList= state.orderList.filter(item => item.id !== temp.id)
            
            }
        
         },
        getBillData(state){
            let list = state.orderList;
            let count = 0;
            let total = 0;
            console.log(current(list));

            list.map(item => {
                count += item.amount
                total += item.price * item.amount
            })
            state.amount = count;
            state.total = total;
            state.orderList=  state.orderList;
        },


    }
})
export const menuReducer = slice.reducer;
export const menuActions = slice.actions