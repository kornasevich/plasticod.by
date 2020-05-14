import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../pages/Main/index";
import About from "../pages/About/index";
import Catalog from "../pages/catalog/Catalog";
import Group from "../pages/catalog/Group";
import Product from "../components/Catalog/components/Product";
import ExampleUsing from '../pages/ExamplesUsing/index';
import ShippingAndPayment from '../pages/ShippingAndPayment/index';
import News from '../pages/News/index';
import BuyAtRetail from '../pages/BuyAtRetail/index';
import Contacts from '../pages/Contacts/index';
import PrivacyPolicy from '../pages/PrivacyPolicy/index';
import IssueOrder from '../pages/IssueOrder/index';
import Login from '../pages/Login/index';
import ResetPassword from '../pages/ResetPassword/index';
import Basket from '../pages/Basket/index';
import AdminPanel from '../pages/AdminPanel/index';
import AdminPanelCatalog from '../pages/AdminPanel/Catalog/index';
import AdminPanelAddProduct from '../pages/AdminPanel/Catalog/AddProduct';
import AdminPanelEditProduct from '../pages/AdminPanel/Catalog/EditProduct';
import AdminPanelNews from '../pages/AdminPanel/News/index';
import AdminPanelAddNews from '../pages/AdminPanel/News/AddNews';
import AdminPanelEditNews from '../pages/AdminPanel/News/EditNews';
import Registration from '../pages/Registration';
import Profile from '../pages/Profile';
import Settings from '../pages/Profile/Settings';
import HistoryOrders from '../pages/Profile/Orders';
import Order from '../pages/Profile/Order';
import infoSupport from '../pages/Profile/infoSupport';
import GeneralAdminPanel from '../pages/AdminPanel/General';
import AdminPanelAbout from '../pages/AdminPanel/About';
import AdminPanelExampleUsing from '../pages/AdminPanel/ExampleUsing';
import AdminPanelAddressShipping from '../pages/AdminPanel/AddressShipping';
import AdminPanelBuyRetail from '../pages/AdminPanel/BuyRetail';
import AdminPanelContacts from '../pages/AdminPanel/Contacts';
import AdminPanelOrders from '../pages/AdminPanel/Orders';
import AdminPanelOrder from '../pages/AdminPanel/Orders/Order';
import AdminLogin from '../pages/AdminPanel/Login';

Vue.use(VueRouter);


export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "main",
            component: Main,
            redirect: {
                path: '/about'
            }, children: [
                {
                    path: "about",
                    name: "about",
                    component: About
                },
                {
                    path: "catalog",
                    name: "catalog",
                    component: Catalog
                },
                {
                    path: 'catalog/:id',
                    name: 'group',
                    component: Group
                },
                {
                    path: 'catalog/:id/:id',
                    name: 'product',
                    component: Product
                },
                {
                    path: 'profile',
                    name: 'profile',
                    component: Profile,
                },
                {
                    path: 'profile/settings',
                    name: 'settings',
                    component: Settings
                },
                {
                    path: 'profile/orders',
                    name: 'history-orders',
                    component: HistoryOrders
                },
                {
                    path: 'profile/orders/:id',
                    name: 'order',
                    component: Order
                },
                {
                    path: 'profile/information-support',
                    name: 'information-support',
                    component: infoSupport
                },
                {
                    path: 'examples-using',
                    name: 'examples-using',
                    component: ExampleUsing
                },
                {
                    path: 'shipping-payment',
                    name: 'shipping-and-payment',
                    component: ShippingAndPayment
                },
                {
                    path: 'news',
                    name: 'news',
                    component: News
                },
                {
                    path: 'buy-retail',
                    name: 'buy-at-retail',
                    component: BuyAtRetail
                },
                {
                    path: 'contacts',
                    name: 'contacts',
                    component: Contacts
                },
                {
                    path: 'privacy-policy',
                    name: 'privacy-policy',
                    component: PrivacyPolicy
                },
                {
                    path: 'issue-order',
                    name: 'issue-order',
                    component: IssueOrder
                },
                {
                    path: 'login',
                    name: 'login',
                    component: Login
                },
                {
                    path: 'reset-password',
                    name: 'reset-password',
                    component: ResetPassword
                },
                {
                    path: 'basket',
                    name: 'basket',
                    component: Basket
                },
                {
                    path: 'registration',
                    name: 'registration',
                    component: Registration
                }
            ]
        },
        {
            path: '/admin/login',
            name: 'admin-login',
            component: AdminLogin
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminPanel,
            redirect: {
                path: 'admin/general'
            },
            children: [
                {
                    path: 'catalog',
                    name: 'admin-catalog',
                    component: AdminPanelCatalog
                },
                {
                    path: 'catalog/add',
                    name: 'add-product',
                    component: AdminPanelAddProduct
                },
                {
                    path: 'catalog/edit/:id',
                    name: 'edit-product',
                    component: AdminPanelEditProduct
                },
                {
                    path: 'news',
                    name: 'admin-news',
                    component: AdminPanelNews
                },
                {
                    path: 'news/add',
                    name: 'add-news',
                    component: AdminPanelAddNews
                },
                {
                    path: 'news/edit/:id',
                    name: 'edit-news',
                    component: AdminPanelEditNews
                },
                {
                    path: 'general',
                    name: 'general',
                    component: GeneralAdminPanel
                },
                {
                    path: 'about',
                    name: 'about',
                    component: AdminPanelAbout
                },
                {
                    path: 'example-using',
                    name: 'example-using',
                    component: AdminPanelExampleUsing
                },
                {
                    path: 'address-shipping',
                    name: 'address-shipping',
                    component: AdminPanelAddressShipping
                },
                {
                    path: 'buy-retail',
                    name: 'buy-retail',
                    component: AdminPanelBuyRetail
                },
                {
                    path: 'contacts',
                    name: 'contacts',
                    component: AdminPanelContacts
                },
                {
                    path: 'orders',
                    name: 'orders',
                    component: AdminPanelOrders
                },
                {
                    path: 'orders/:id',
                    name: 'order',
                    component: AdminPanelOrder
                }
            ]
        }

    ]
});
