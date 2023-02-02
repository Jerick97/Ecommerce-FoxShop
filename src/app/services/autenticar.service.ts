import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from '@angular/fire/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where  } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Roles, Users } from '../interfaces/users';
@Injectable({
  providedIn: 'root'
})
export class AutenticarService {
  public userInfo: any;

  constructor(private auth:Auth , private fireStore:Firestore) { }
  
  // Métodos del Login
  registrar({email,password} : any){
    return createUserWithEmailAndPassword(this.auth, email, password); //recibe un objeto con email y password para crear un usuario con esos datos.
  }

  async login({email,password}:any){
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(({user}) => {
        return user;
      })
      .catch(error => {
        console.error(error)
        return error;
      });
  }

  logout(){
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
  /*async getUserData(uid:string){
    const q = query(collection(this.fireStore, "Usuarios"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    let userData : any[] = [];
    querySnapshot.forEach((doc) => {
      userData.push({...doc.data()});
    });
    return userData;
  }*/

  //Este método retorna true si el usuario tiene rol de Admin y false de lo contrario
  /*sAdmin(userData: any) {
    const [{ roles , email, name}] = userData;
    const rol = roles.admin === true ? true : false;
    this.userInfo = JSON.stringify({email, name, rol});
  }*/

  StatusUser(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      return true
    }
    return false
  }

  async getDatosUser() {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user !== null) {
      const path = 'Usuarios';
      const id = user.uid;
      const usuariosRef = collection(this.fireStore, path);
      const q = query(usuariosRef, where("uid", "==", id));
      const querySnapshot = await getDocs(q);
      let userData: any[] = [];
      querySnapshot.forEach((doc) => {
        userData.push(doc.data());
      });
      return userData
    } else {
      return false;
    }
  }

}
