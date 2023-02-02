import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegistroUserComponent } from './components/Auth/registro-user/registro-user.component';
import { AdministrarProductoComponent } from './components/Productos/administrar-producto/administrar-producto.component';
import { RegistroProductoComponent } from './components/Productos/registro-producto/registro-producto.component';
import { HomeComponent } from './pages/home/home.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ProductosComponent } from './pages/productos/productos.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';

const routes: Routes = [
  {path:'login',component:LoginComponent}, // redirigir al Login
  {path:'register',component:RegistroUserComponent}, // redirigir al Registro Usuario
  {path:'home',component:HomeComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))}, // redirigir al Registro Home
  {path:'registrar-producto',component:RegistroProductoComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))}, // redirigir al Registro Registro
  {path:'administrar-producto',component:AdministrarProductoComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))}, // redirigir al Administrar Registro
  {path:'productos',component:ProductosComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))}, // redirigir al Ver todos los Productos
  {path:'detalle/:id',component:DetalleComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))}, //redirigir al Ver Detalle del Producto
  {path:'pedidos',component:PedidosComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))}, //redirigir al Ver Detalle de los pedidos
  { path: '**', pathMatch:'full', redirectTo: 'login' } //Cualquier url redirigir al Login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
