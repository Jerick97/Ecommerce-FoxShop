import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/interfaces/productos';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {

  public products!:Productos[];
  constructor( private mantenimientoService: MantenimientoService ){}

  ngOnInit(): void {

    this.mantenimientoService.getProducto().subscribe(producto => {
      this.products = producto
    })
  }

}
