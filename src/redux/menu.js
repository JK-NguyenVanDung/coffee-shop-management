import { createSlice,current } from "@reduxjs/toolkit";


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
    openPrint: false,
    print: false,
    menuGroup: true,
    info: {},
    showInfo: false,
    openDetail: false,
    listCate:[],
    listAll:[],
    loadData: false,
    dishType: "drink",
    selectedCate: "",
    searchList: [],
    
}
const slice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setListCate(state, actions) {
            state.listCate = actions.payload;

        }, 
        setListAll(state, actions) {
            state.listAll = actions.payload;

        },      
        changeLoad(state, actions) {
            state.loadData = actions.payload;
        },
        showInfo(state,actions){
            state.showInfo = true;
            console.log(actions.payload);
            state.info = actions.payload;
        },
        hideInfo(state) {
            state.showInfo = false;

        },
        showDetail(state) {
            state.openDetail = true;
            state.show = false;
        },
        closeDetail(state) {
            state.openDetail = false;
            state.show = true;

        },
        printBill(state) {
            state.openPrint = false;
            state.show = false;
         
        },
        createOrder(state){
            // return initialState;

        },
        resetOrder(state){
            state.show= false;
            state.loadData= false;
            state.note= "";
            state.amount= 0;
            state.totalBill=0;
            state.total= 0;
            state.paymentMethod= "cash";
            state.printBill= true;
            state.openPrint= false;
            state.print= false;
            state.info= {};
            state.showInfo= false;
            state.openDetail= false;
            state.orderList = [];
            state.loadData= false ;
        },
        showPrintBill(state) {
            state.openPrint = true;
            state.show = false;

        },
        closePrintBill(state) {
            state.openPrint = false;

        },
        showOrderBar(state) {
            state.show = true;
        },
        closeOrderBar(state) {
            state.show= false;
            state.loadData= false;
            state.note= "";
            state.amount= 0;
            state.totalBill=0;
            state.total= 0;
            state.paymentMethod= "cash";
            state.printBill= true;
            state.openPrint= false;
            state.print= false;
            state.info= {};
            state.showInfo= false;
            state.openDetail= false;
            state.orderList = [];
            state.loadData= false ;     
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
        cancelPrint(state){state.openPrint = false},
        addOrderItem(state,actions){

            let temp = JSON.parse(JSON.stringify(actions.payload));
            let exist = false;
            if(state.orderList.length > 0){
                state.orderList.map((item)=>{
                    if(temp._id === item._id){
                        item.amount +=1;
                        exist = true
                    }
                })
                                 
            }
            if(!exist){
                temp.amount = 1;
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

            list.map(item => {
                count += item.amount
                total +=  item.price * item.amount;
            })
            // totalBill =  total+ ( Math.floor(total *0.1)); 
            state.amount = count;
            state.total = total;
            state.totalBill = total;
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
            state.show= false;
            state.loadData= false;
            state.note= "";
            state.amount= 0;
            state.totalBill=0;
            state.total= 0;
            state.paymentMethod= "cash";
            state.printBill= true;
            state.openPrint= false;
            state.print= false;
            state.info= {};
            state.showInfo= false;
            state.openDetail= false;
            state.orderList = [];
            state.loadData= false ;
        },
        changeCategory(state,actions){
            state.selectedCate =actions.payload;
        },
        setListSearch(state,actions){
            state.searchList =actions.payload;
        },

    }
})
export const menuReducer = slice.reducer;
export const menuActions = slice.actions