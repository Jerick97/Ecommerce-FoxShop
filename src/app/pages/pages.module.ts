import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { ProductosComponent } from './productos/productos.component';
import { DetalleComponent } from './detalle/detalle.component';
import { RouterModule } from '@angular/router';
import { PedidosComponent } from './pedidos/pedidos.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductosComponent,
    DetalleComponent,
    PedidosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    RouterModule
  ],
  exports:[
    HomeComponent,
    ProductosComponent,
    DetalleComponent,
    PedidosComponent
  ]
})
export class PagesModule { }
