import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroUserComponent } from './Auth/registro-user/registro-user.component';
import { LoginComponent } from './Auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegistroProductoComponent } from './Productos/registro-producto/registro-producto.component';
import { SharedModule } from '../shared/shared.module';
import { AdministrarProductoComponent } from './Productos/administrar-producto/administrar-producto.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CarruselComponent } from './carrusel/carrusel.component';
import { CardProductoComponent } from './Productos/card-producto/card-producto.component';


@NgModule({
  declarations: [
    RegistroUserComponent,
    LoginComponent,
    RegistroProductoComponent,
    AdministrarProductoComponent,
    CarruselComponent,
    CardProductoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    NgxPaginationModule
  ],
  exports: [
    RegistroUserComponent,
    LoginComponent,
    RegistroProductoComponent,
    AdministrarProductoComponent,
    CarruselComponent,
    CardProductoComponent
  ]
})
export class ComponentsModule { }
