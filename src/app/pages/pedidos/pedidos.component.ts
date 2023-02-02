import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos !: any;
  total:number = 0;
  constructor(private mantenimientoService:MantenimientoService, private router:Router) { 
    this.pedidos = this.mantenimientoService.getLocalStorage()
    this.total = this.pedidos.reduce((acc:any, obj:any) => acc + obj.costoTotal, 0);
  }

  ngOnInit(): void {
    console.log(this.pedidos)
  }

  eliminarPedidos(){
    this.mantenimientoService.eliminarLocalStorage();
    alert("Se eliminaron los Productos")
    this.pedidos = [];
    this.total = 0;
    this.router.navigate(['/productos'])
  }
}
