import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegistroUserComponent } from './components/Auth/registro-user/registro-user.component';
import { AdministrarProductoComponent } from './components/Productos/administrar-producto/administrar-producto.component';
import { RegistroProductoComponent } from './components/Productos/registro-producto/registro-producto.component';
import { HomeComponent } from './pages/home/home.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {path:'login',component:LoginComponent}, // redirigir al Login
  {path:'register',component:RegistroUserComponent}, // redirigir al Registro Usuario
  {path:'home',component:HomeComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))}, // redirigir al Registro Home
  {path:'registrar-producto',component:RegistroProductoComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))}, // redirigir al Registro Registro
  {path:'administrar-producto',component:AdministrarProductoComponent, ...canActivate(() => redirectUnauthorizedTo(['/login']))}, // redirigir al Administrar Registro
  { path: '**', pathMatch:'full', redirectTo: 'login' } //Cualquier url redirigir al Login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
