import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticarService } from 'src/app/services/autenticar.service';

@Component({
  selector: 'app-registro-user',
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.css']
})
export class RegistroUserComponent implements OnInit {

  public formRegistro !: FormGroup;
  constructor( private userService:AutenticarService, private router:Router, private formBuilder:FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.formRegistro = this.formBuilder.group({
      name:['',[
        Validators.required,
        Validators.minLength(4)
      ]],
      email:['',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ]] ,
      password:['',[
        Validators.required,
        Validators.minLength(8)
      ]]
    })
  }

  onSubmit(){
    this.userService.addUsuarioAndRegister(this.formRegistro.value).then( response => {
      console.log(response) //mostramos en consola la respuesta del servicio
      this.router.navigate(['/login']); //si todo salio correcto lo enviamos al login
    })
    .catch( error => console.log(error)); //mostrar el error en la consola
  }

}
