import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productos } from 'src/app/interfaces/productos';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  public productos !: any;
  constructor(private route:ActivatedRoute,private mantenimientoService:MantenimientoService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); //almacena el id del documento obtenido por la url
    this.getDetalleProducto(id);
  }

  getDetalleProducto(id: any) {
    this.mantenimientoService.getDetalleProducto(id).then(producto => {
      this.productos = producto;
      console.log(this.productos)
    });
  }

  
}
