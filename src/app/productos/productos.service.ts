import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cambiaDato = new Subject<Producto[]>();
  private lastId = 1;

   productos: Producto[] = [
     new Producto(this.lastId++, 'atun', 'tuny', 'embutidos', 16, 25),
     new Producto(this.lastId++, 'salmon', 'tuny', 'embutidos', 21, 35),
     new Producto(this.lastId++, 'pulpo', 'tuny', 'embutidos', 18, 30),
     new Producto(this.lastId++, 'oreo', 'gamesa', 'galletas', 27, 15),
     new Producto(this.lastId++, 'chokis', 'gamesa', 'galletas', 22, 18),
     new Producto(this.lastId++, 'principe', 'marinela', 'galletas', 24, 20),
     new Producto(this.lastId++, 'saladitas', 'gamesa', 'galletas', 14, 12),
     new Producto(this.lastId++, 'canelitas', 'marinela', 'galletas', 15, 8),
   ];

   carrito: Producto[] = [ ];

  constructor() {   }

  getNextId(): number {
    return this.lastId;
  }

  getProductos(): Producto[] {
    return this.productos.slice();
  }

  getProducto(id: number): Producto {
    const pos = this.productos.findIndex(al => al.id === id);
    return Object.assign({}, this.productos[pos]);
  }

  notificarCambios() {
    this.cambiaDato.next(this.productos.slice());
  }
  notificarCambiosCarrito() {
    this.cambiaDato.next(this.carrito.slice());
  }

  addToCart(producto: Producto): boolean {
// tslint:disable-next-line: no-shadowed-variable
    const pro = this.carrito.find(pro => pro.nombre.toUpperCase() === producto.nombre.toUpperCase());
    if (pro) {
      return false;
    }
    this.carrito.push(Object.assign({}, producto));
    this.notificarCambiosCarrito();
    return true;
  }

  getCarrito(): Producto[] {
    return this.carrito.slice();
  }

  getTotalCarrito(): number {
    let suma = 0;
    this.carrito.forEach(item => suma += item.precio);
    return suma;
  }

   sumar(producto, suma) {
    return suma += producto.precio;
  }

  borrarProducto(id: number): boolean {
    const proPos = this.carrito.findIndex(pro => pro.id === id);
    if (proPos >= 0) {
      console.log('Producto borrado del carrito');
      this.carrito.splice(proPos, 1);
      this.notificarCambiosCarrito();
      return true;
    }
    return false;
  }

}
