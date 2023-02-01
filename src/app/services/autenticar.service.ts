import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where  } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Roles, Users } from '../interfaces/users';
import { async } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AutenticarService {
  public adminUser :boolean = false; //almacena si es admin true o false
  public emailUser !:string; //el email del usuario que inicio sesión
  public nameUser !:string; //el name del Usuario que inicio sesión

  constructor(private auth:Auth , private fireStore:Firestore) { }
  
  // Métodos del Login
  registrar({email,password} : any){
    return createUserWithEmailAndPassword(this.auth, email, password); //recibe un objeto con email y password para crear un usuario con esos datos.
  }

  async login({email,password}:any){
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(({user}) => {
        this.getUserData(user.uid);
        return user;
      })
      .catch(error => {
        console.error(error)
        return error;
      });
  }

  logout(){
    this.adminUser = false;
    this.emailUser = '';
    this.nameUser = '';
    return signOut(this.auth); // para cerrar sesión.
  }

  //Métodos de Registro

  // Método para agregar un usuario y registrarlo en la autenticación de Firebase
  async addUsuarioAndRegister(usuario: Users) {
    try {
      // Registrar al usuario en la autenticación de Firebase
      const { user } = await this.registrar({ email: usuario.email, password: usuario.password });

      // Obtener el id generado por Firebase para el usuario recién agregado
      const uid = user.uid;
      usuario.uid = uid;

      // Agregar usuario a la colección de Usuarios en Firestore
      const usuarioRef = collection(this.fireStore, 'Usuarios'); //creamos una referencia a la colección "Usuarios" en Firestore para agregar o leer documentos de la colección "Usuarios".
      const roles: Roles = {visitante: true}; //la cuenta por defecto sera con el Rol Visitante {visitante: true, admin: false}
      const usuarioDetail: Users = {...usuario, roles}; //le añadimos el rol junto con los valores del formulario Registro
      await addDoc(usuarioRef, usuarioDetail);

      return { success: true, message: 'Usuario agregado y registrado exitosamente' };
    } catch (error : any) {
      return { success: false, message: error.message };
    }
  }

  //Consultas Simples Firebase para obtener la información del usuario que inicia sesión
  async getUserData(uid:string){
    const q = query(collection(this.fireStore, "Usuarios"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    let userData : any[] = [];
    querySnapshot.forEach((doc) => {
      userData.push({...doc.data()});
    });
    this.isAdmin(userData)
    return userData;
  }

  //Este método retorna true si el usuario tiene rol de Admin y false de lo contrario

  isAdmin(userData: any) {
    const [{ roles , email, name}] = userData;
    const rol = roles.admin === true ? true : false; //si tiene el rol admin actualiza el valor de adminUser
    this.adminUser = rol; //esto nos ayuda a saber si el usuario es admin
    this.emailUser = email; //el email del que inicio sesión
    this.nameUser = name; //el nombre del que inicio sesión
  }
}
