import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Account } from './pages/account/account';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { Contact } from './pages/contact/contact';
import { ComboPack } from './pages/combo-pack/combo-pack';
import { TailoringMaterial } from './pages/tailoring-material/tailoring-material';
import { AariMaterial } from './pages/aari-material/aari-material';
import { KundanStoneFittingStone } from './pages/kundan-stone-fitting-stone/kundan-stone-fitting-stone';
import { JewelleryMakingMaterial } from './pages/jewellery-making-material/jewellery-making-material';
import { ArtificialFlowerMakingMaterial } from './pages/artificial-flower-making-material/artificial-flower-making-material';
import { BroochMaterial } from './pages/brooch-material/brooch-material';
import { PackingMaterials } from './pages/packing-materials/packing-materials';
import { OrderSuccess } from './pages/order-success/order-success';
import { Payment } from './pages/payment/payment';
import { Privacy } from './pages/privacy/privacy';
import { Product } from './pages/product/product';
import { Refund } from './pages/refund/refund';
import { Shipping } from './pages/shipping/shipping';
import { Terms } from './pages/terms/terms';
import { Wishlist } from './pages/wishlist/wishlist';
import { About } from './pages/about/about';
import { Login } from './pages/login/login';
import { Registration } from './pages/registration/registration';
import { BroochMaterialsView } from './pages/brooch-material/brooch-materials-view/brooch-materials-view';
import { BroochMaterialsFullView } from './pages/brooch-material/brooch-materials-full-view/brooch-materials-full-view';



export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'account',
    component: Account,
  },
  {
    path: 'cart',
    component: Cart,
  },
  {
    path: 'checkout',
    component: Checkout,
  },
  {
    path: 'contact',
    component: Contact,
  },
  {
    path: 'combo-pack',
    component: ComboPack,
  },
  {
    path: 'tailoring-material',
    component: TailoringMaterial,
  },
  {
    path: 'aari-material',
    component: AariMaterial,
  },
  {
    path: 'kundan-stone-fitting-stone',
    component: KundanStoneFittingStone,
  },
  {
    path: 'jewellery-making-material',
    component: JewelleryMakingMaterial,
  },
  {
    path: 'artificial-flower-making-material',
    component: ArtificialFlowerMakingMaterial,
  },
  {
    path: 'brooch-material',
    component: BroochMaterial,
  },
  {
    path: 'packing-materials',
    component: PackingMaterials,
  },
  {
    path: 'order-success',
    component: OrderSuccess,
  },
  {
    path: 'payment',
    component: Payment,
  },
  {
    path: 'privacy',
    component: Privacy,
  },
  {
    path: 'product',
    component: Product,
  },
  {
    path: 'refund',
    component: Refund,
  },
  {
    path: 'shipping',
    component: Shipping,
  },
  {
    path: 'terms',
    component: Terms,
  },
  {
    path: 'wishlist',
    component: Wishlist,
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'login',
    component: Login, 
  },
  {
    path: 'registration',
    component: Registration,
  },

  {
    path: 'brooch-materials-view',
    component: BroochMaterialsView,
  },
  {
    path: 'brooch-materials-full-view',
    component: BroochMaterialsFullView,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
