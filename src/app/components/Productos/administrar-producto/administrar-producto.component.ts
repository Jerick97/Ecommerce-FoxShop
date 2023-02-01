import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/interfaces/productos';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-administrar-producto',
  templateUrl: './administrar-producto.component.html',
  styleUrls: ['./administrar-producto.component.css']
})
export class AdministrarProductoComponent implements OnInit {
  products!:Productos[];
  page = 1;
  constructor( private mantenimientoService: MantenimientoService ){}

  ngOnInit(): void {

    this.mantenimientoService.getProducto().subscribe(producto => {
      this.products = producto
    })
  }

  onClickDelete(producto: Productos) {
    Swal.fire({
        title: '¿Está seguro?',
        text: 'Una vez eliminada, no podrá recuperar el Producto',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result:any) => {
        if (result.value) {
            this.mantenimientoService.deleteProducto(producto)
                .then(response => {
                    console.log(response);
                    Swal.fire(
                        'Eliminado!',
                        'El Producto ha sido eliminado.',
                        'success'
                    );
                })
                .catch(error => {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Hubo un problema al eliminar el Producto, por favor intente de nuevo.'
                    });
                });
        }
    });
  }

}
