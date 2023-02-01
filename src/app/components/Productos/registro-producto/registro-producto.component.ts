import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-producto',
  templateUrl: './registro-producto.component.html',
  styleUrls: ['./registro-producto.component.css']
})
export class RegistroProductoComponent implements OnInit {
  public formRegistro !: FormGroup;
  constructor( private mantenimientoServices:MantenimientoService, private router:Router, private formBuilder:FormBuilder){

  }
    
  ngOnInit(): void {
    this.formRegistro = this.formBuilder.group({
      producto:['',[
        Validators.required,
        Validators.minLength(4)
      ]],
      descripcion:['',[
        Validators.required,
        Validators.minLength(4)
      ]],
      costo:['',[
        Validators.required,
        Validators.pattern(/^[0-9.]+$/) //solo números y punto
      ]],
      oferta:['',[
        Validators.required,
        Validators.pattern(/^[0-9.]+$/) //solo números y punto
      ]],
      foto:['',[
        Validators.required,
        Validators.pattern(/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/) //solo url
      ]],
      categoria:['',[
        Validators.required
      ]],
    })
  }

  async onSubmit() {
    this.mantenimientoServices.addProducto(this.formRegistro.value).then( response => {
      console.log(response)
      this.formRegistro.reset();
      this.formRegistro.get('categoria')?.setValue('');
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'El producto ha sido registrado correctamente.'
      });
    })
    .catch( error => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un problema al agregar el producto, por favor intente de nuevo.'
      });
    });
  }

}
