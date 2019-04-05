import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../productos.service';
import { Location } from '@angular/common';
import { ProductosListaComponent } from '../productos-lista/productos-lista.component';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  id: number;
  producto: Producto;
  error = false;
  modoCarrito = false;

  constructor(private route: ActivatedRoute,
              private productoService: ProductosService,
              private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.modoCarrito = this.router.url.match('carrito') ? true : false;
    console.log(this.modoCarrito);
    this.route.params
    .subscribe(
      (params) => {
        this.id = Number(params.id);
        this.error = false;
        this.producto = this.productoService.getProducto(this.id);
      }
    );
  }

  cancelar(){
    this.location.back();
  }
}
