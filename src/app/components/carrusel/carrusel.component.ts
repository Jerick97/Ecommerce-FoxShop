import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from 'src/app/interfaces/productos';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  cantidad !: number;
  carrito !: any;
  showModal = false;
  public products!:Productos[];
  constructor( private mantenimientoService: MantenimientoService , private router:Router){}

  ngOnInit(): void {

    this.mantenimientoService.getProducto().subscribe(producto => {
      this.products = producto
    })
  }

  verDetalle(id:any){
    this.router.navigate(['/detalle',String(id)]);
    
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }
  
  addCarrito(name:string,costo:string,oferta:string){
    this.carrito = {name,costo,oferta}
    return this.carrito
  }

  guardarCarrito(cantidad:number){
      if(cantidad){
        this.carrito.cantidad = cantidad;
        this.carrito.costoTotal = Number(this.carrito.oferta) > 0 ? cantidad * Number(this.carrito.oferta) : cantidad * Number(this.carrito.costo);
        this.mantenimientoService.saveLocalStorage(this.carrito);
        alert("Se guardo el Carrito");
        this.cantidad = 0;
        this.router.navigate(['/pedidos']);
      }else{
        alert("Debes Ingresar una Cantidad");
        this.carrito = {};
      }
  }
}
