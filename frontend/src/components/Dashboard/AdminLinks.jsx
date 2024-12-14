import { GrUserAdmin } from 'react-icons/gr';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { BsCashCoin } from 'react-icons/bs';

export const adminLinks = [
  { name: 'Users', icon: GrUserAdmin, path: 'admin/userlist' },
  {
    name: 'Products',
    icon: MdProductionQuantityLimits,
    path: 'admin/productlist',
  },
  { name: 'Orders', icon: BsCashCoin, path: 'admin/orderlist' },
];
