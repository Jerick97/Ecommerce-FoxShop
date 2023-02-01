import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Productos } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  constructor( private fireStore:Firestore ) { }

  
  addProducto(productos:Productos){
    const productosRef = collection(this.fireStore,'productos' );
    return addDoc(productosRef, productos);
  }

  getProducto():Observable<Productos[]> {
    const productosRef = collection(this.fireStore, 'productos')
    return collectionData(productosRef, {idField:'id'}) as Observable<Productos[]>
  }


  deleteProducto(productos:Productos){
    const productosRef = doc(this.fireStore, `productos/${productos.id}`)
    return deleteDoc(productosRef);
  }
}
