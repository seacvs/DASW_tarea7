import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { Subscription } from 'rxjs';
import { ProductosService } from '../productos.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  private subscript: Subscription;
  error: boolean;

  constructor(private productosService: ProductosService ,
              private router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    this.productos = this.productosService.getProductos();
    this.carrito = this.productosService.getCarrito();
    this.tempCarrito = 0;
    this.totalCarrito = 0;
    if (this.router.url.match('carrito')) {
      this.modoCarrito = true;
      this.subscript = this.productosService.cambiaDato.
      subscribe((arregloProductos: Producto[]) => {
        this.carrito = arregloProductos;
        });
      this.totalCarrito = this.productosService.getTotalCarrito();
    } else {
      this.modoCarrito = false;
      this.subscript = this.productosService.cambiaDato.
      subscribe((arregloProductos: Producto[]) => {
        this.productos = arregloProductos;
        });
    }
    console.log("Productos:" , this.productos);
    console.log("Carrito:" , this.carrito);
  
  }

  anadirAlCarrito() {
    this.productos.forEach(pro => {
      if (!this.productosService.addToCart(pro)) {
        this.error = true;
      }
    });
  }

  mostrarDetalle(productoDetalle) {
    this.router.navigate([productoDetalle.id], {relativeTo: this.route});
  }

  borrarProductoCarrito(productoABorrar) {
    this.productosService.borrarProducto(productoABorrar.id);
  }

  actualizarTotalCarrito(checkbox) {
    console.log(checkbox);
      this.tempCarrito++;
  }

}
