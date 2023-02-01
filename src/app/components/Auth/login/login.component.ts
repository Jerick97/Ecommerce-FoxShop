import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticarService } from 'src/app/services/autenticar.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin !: FormGroup;
  constructor( private userService:AutenticarService, private router:Router, private formBuilder:FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
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
    this.userService.login(this.formLogin.value)
    .then(response => {
        console.log(response)
        this.router.navigate(['/home']);
    })
    .catch( error => {
        console.log(error)
        let errorMessage = 'Ha ocurrido un error desconocido. Por favor, inténtelo de nuevo más tarde.';
        if (error.code === 'auth/user-not-found') {
            errorMessage = 'No se ha encontrado un usuario con ese email.';
        } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'La contraseña es incorrecta.';
        }
        Swal.fire('Error', errorMessage, 'error');
    });
}
}
