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
    show: false,
    loadData: false,
    orderList: [],
    note: "",
    amount: 0,
    totalBill:0,
    total: 0,
    paymentMethod: "cash",
    printBill: true,
    menuGroup: "drink",
    openDetail: false,
    listCate:[],
    dishType: "drink",
    selectedCate: "CT01",
}
const slice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        showDetail(state) {
            state.openDetail = true;
            state.show = false;

        },
        closeDetail(state) {
            state.openDetail = false;
            state.show = true;

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
            console.log(12)
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
            let totalBill = 0;
            console.log(current(list));

            list.map(item => {
                count += item.amount
                total +=  item.price * item.amount;
            })
            totalBill =  total+ ( Math.floor(total *0.1)); 
            state.amount = count;
            state.total = total;
            state.totalBill = totalBill;
            state.orderList=  state.orderList;
        },
        increaseAmount(state,actions){
            let temp = actions.payload;
            state.orderList.map(item=>{
                if(item.id === temp){
                    item.amount +=1;
                }
            })
        },
        decreaseAmount(state,actions){
            let temp = actions.payload;
            state.orderList.map(item=>{
                if(item.id === temp){
                   if(item.amount >1) {
                    item.amount-=1};
                }
            })
        },
        changePrint(state){
            state.printBill = !state.printBill;
        },
        changePayment(state,actions){
            let temp = actions.payload;
            state.paymentMethod = temp.target.value;
        },
        setNote(state,actions){
            let temp = actions.payload;
            state.note = temp.target.value;

        },
        cancelOrder(state){
            return initialState;

        },
        changeCategory(state,actions){
            let temp = actions.payload;
            state.selectedCate = temp;
            console.log(state.selectedCate);
        }


    }
})
export const menuReducer = slice.reducer;
export const menuActions = slice.actions