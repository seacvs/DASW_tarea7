import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { Subscription } from 'rxjs';
import { ProductosService } from '../productos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';

@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.css']
})
export class ProductosListaComponent implements OnInit {
  productos: Producto[];
  carrito: Producto[];
  modoCarrito = false;
  tempCarrito: number;
  totalCarrito: number;
  tempArray: Producto[] = [];

  private subscript: Subscription;
  private subscriptCarrito: Subscription;
  error: boolean;

  constructor(private productosService: ProductosService ,
              private router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    this.tempArray = [];
    this.productos = this.productosService.getProductos();
    this.carrito = this.productosService.getCarrito();
    this.tempCarrito = 0;
    this.totalCarrito = 0;
    if (this.router.url.match('carrito')) {
      this.modoCarrito = true;
      this.subscriptCarrito = this.productosService.cambiaDato.
      subscribe((arregloProductos: Producto[]) => {
        this.carrito = arregloProductos;
        });
    } else {
      this.modoCarrito = false;
      // this.subscript = this.productosService.cambiaDato.
      // subscribe((arregloProductos: Producto[]) => {
      //   this.productos = arregloProductos;
      //   });
    }
    this.totalCarrito = this.productosService.getTotalCarrito();
    console.log("Productos:" , this.productos);
    console.log("Carrito:" , this.carrito);
  
  }

  anadirAlCarrito(productoAñadir) {
    //console.log(productoAñadir);
    this.carrito = this.productosService.getCarrito();
    const pos = this.tempArray.findIndex(pro => pro.id === productoAñadir.id);
    //console.log(pos);
    if (pos < 0 ) {
      this.tempArray.push(Object.assign({}, productoAñadir));
      this.tempCarrito++;
    } else{
      if(this.tempArray.length > 0) {
        this.tempCarrito--;
        this.tempArray.splice(pos, 1);
      }
    }
    console.log(this.tempArray);
  }

  enviarAlCarrito(){
    //console.log("alsss" + this.tempArray);
    if(this.tempArray.length>0){
      //console.log("al carrito" + this.tempArray);
      this.tempArray.forEach(pro => {
       if (!this.productosService.addToCart(this.productosService.getProducto(pro.id))) {
        this.error = true;
       }
      });
      this.totalCarrito=this.tempArray.length;
    }
  }

  mostrarDetalle(productoDetalle) {
    this.router.navigate([productoDetalle.id], {relativeTo: this.route});
  }

  borrarProductoCarrito(productoABorrar) {
    this.productosService.borrarProducto(productoABorrar.id);
    this.totalCarrito = this.productosService.getTotalCarrito();

  }

  actualizarTotalCarrito(checkbox) {
    this.tempCarrito++;
  }

}
