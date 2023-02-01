import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticarService } from 'src/app/services/autenticar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username !: string;
  public showMenu : boolean = true;
  constructor(private usuariosService:AutenticarService, private router:Router) { }

  ngOnInit(): void {
    this.username = this.usuariosService.nameUser;
    console.log(this.username)
  }

  toggle(){
    this.showMenu = !this.showMenu;
  }

  //cerrar sesión
  Logout(){
    this.usuariosService.logout();
    this.router.navigate(['/login']); //redirigimos al login
  }


}
