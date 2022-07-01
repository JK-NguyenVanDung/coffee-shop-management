import {
    AmazonOutlined,
    BoxPlotFilled,
    BulbOutlined,
    PieChartOutlined,
    ProjectOutlined,
    GiftOutlined,
    TeamOutlined,
    UserOutlined,
    MenuOutlined,
    
    CommentOutlined
  } from "@ant-design/icons";
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import LocalCafeRoundedIcon from '@mui/icons-material/LocalCafeRounded';
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import { AdminRouter } from "../../router/pageRouter";
  
  export const ROLES = [
    { value: 0b1, key: "menu", name: "Menu" },
    { key: "employee_manager", value: 0b10, name: "Quản lý Nhân viên" },
    { key: "analysis", value: 0b100, name: "Thống kê" },
    {
      key: "food_and_drink_manager",
      value: 0b1000,
      name: "Quản lí món"
    },
    { key: "category_manager", value: 0b10000, name: "Quản lý nhóm món" },
    { key: "bills_manager", value: 0b100000, name: "Quản lí hoá đơn" },

    { key: "inventory_manager", value: 0b1000000, name: "Quản lí kho hàng" },
    { key: "recipes_manager", value: 0b10000000, name: "Quản lý công thức" },

  ];
  export const MENU = [
    {
      id: 1,
      path: AdminRouter.MENU.path,
      icon: MenuBookRoundedIcon,
      title: "Menu",
      children: [],
      value: 0b1
    },
    {
      id: 2,
      path: AdminRouter.EMPLOYEES.path,
      icon: UserOutlined,
      title: "Quản lý nhân viên",
      children: [],
      value: 0b10
    },
    {
      id: 3,
      path: AdminRouter.ANALYSIS.path,
      icon: TimelineRoundedIcon,
      title: "Thống kê",
      children: [],
      value: 0b100
    },
    {
      id: 4,
      path: AdminRouter.FOOD_AND_DRINK.path,
      icon: LocalCafeRoundedIcon,
      title: "Quản lý món",
      children: [],
      value: 0b1000
    },
    {
      id: 5,
      path: AdminRouter.CATEGORY.path,
      icon: ListAltRoundedIcon,
      title: "Quản lý nhóm món",
      children: [],
      value: 0b10000
    },
    {
      id: 6,
      path: AdminRouter.BILLS.path,
      icon: ReceiptLongRoundedIcon,
      title: "Quản lý hoá đơn",
      children: [],
      value: 0b100000
    },
    {
      id: 7,
      path: AdminRouter.INVENTORY.path,
      icon: WarehouseRoundedIcon,
      title: "Quản lý kho hàng",
      children: [],
      value: 0b100000
    },
    {
      id: 8,
      path: AdminRouter.RECIPES.path,
      icon: ContentPasteRoundedIcon,
      title: "Quản lý công thức",
      children: [],
      value: 0b1000000
    },
  ];
  