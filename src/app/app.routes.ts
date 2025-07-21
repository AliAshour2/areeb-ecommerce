import { Routes } from '@angular/router';
import { ProductDetailsPageComponent } from './features/products/pages/product-details-page/product-details-page.component';
import { productDetailsResolver } from './features/products/resolvers/product-details.resolver';

export const routes: Routes = [
    {path:'sign-up-page' , loadComponent: ()=> import('./features/auth/components/sign-up-form/sign-up-form.component').then(m=>m.SignUpFormComponent) },
    {path: 'sign-in-page' , loadComponent: ()=> import('./features/auth/components/sign-in-form/sign-in-form.component').then(m=>m.SignInFormComponent)},
    {path: 'shop' , loadComponent : ()=> import('./features/products/pages/products-page/products-page.component').then(m=>m.ProductsPageComponent)},
    {
        path : 'products/:id',
        loadComponent: () => import('./features/products/pages/product-details-page/product-details-page.component').then(m => m.ProductDetailsPageComponent),
        resolve : {product :productDetailsResolver}
    } ,
    {
        path :'cart',
        loadComponent : ()=> import('./features/cart/pages/cart-page/cart-page.component').then(m=>m.CartPageComponent),

    }
];
