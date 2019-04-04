import { Injectable } from '@angular/core';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private lastId = 1;
   productos: Producto[] = [
     new Producto(this.lastId++,'atun','tuny','embutidos',16,25),
     new Producto(this.lastId++,'salmon','tuny','embutidos',21,35),
     new Producto(this.lastId++,'pulpo','tuny','embutidos',18,30),
     new Producto(this.lastId++,'oreo','gamesa','galletas',27,15),
     new Producto(this.lastId++,'chokis','gamesa','galletas',22,18),
     new Producto(this.lastId++,'principe','marinela','galletas',24,20),
     new Producto(this.lastId++,'saladitas','gamesa','galletas',14,12),
     new Producto(this.lastId++,'canelitas','marinela','galletas', 15, 8),
   ]

  constructor() {   }
}
