import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { canActiveGuard } from './core/guard/can-active.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {path:'' , component:MainLayoutComponent, canActivate:[canActiveGuard] , children:[
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent , title: 'Home'},
        { path:'products' , loadComponent:()=>import('./pages/products/products.component').then((classes)=>classes.ProductsComponent), title: 'Products'},
        { path:'categories' ,loadComponent:()=>import('./pages/categories/categories.component').then((classes)=>classes.CategoriesComponent) , title: 'Categories'},
        { path:'brands' , loadComponent:()=>import('./pages/brands/brands.component').then((classes)=>classes.BrandsComponent) , title: 'Brands'},
        { path:'cart' , loadComponent:()=>import('./pages/cart/cart.component').then((classes)=>classes.CartComponent) , title: 'Cart'},
        { path:'allorders' , loadComponent:()=>import('./pages/allorders/allorders.component').then((classes)=>classes.AllordersComponent) , title: 'Allorders'},
        { path:'product-details/:p-id', loadComponent:()=>import('./pages/product-details/product-details.component').then((classes)=>classes.ProductDetailsComponent) , title:'Product Details'}, 
        { path:'checkout/:c_id', loadComponent:()=>import('./pages/checkout/checkout.component').then((classes)=>classes.CheckoutComponent) , title:'Product Checkout'}, 
        { path:'wishlist', loadComponent:()=>import('./pages/wishlist/wishlist.component').then((classes)=>classes.WishlistComponent) , title:'Wishlist'}, 
        { path:'profile', loadComponent:()=>import('./pages/profile/profile.component').then((classes)=>classes.ProfileComponent) , title:'Profile'}, 
    ]},
    {path:'' , component:AuthLayoutComponent , children:[
        { path: 'login', component: LoginComponent , title: 'Login'},
        { path: 'register', component: RegisterComponent , title: 'Register'},
        { path: '**', component:NotFoundComponent, title: 'Error' }

    ]}
];