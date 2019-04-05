import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../producto';
import { ProductosListaComponent } from '../productos-lista.component';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.css']
})
export class ProductoItemComponent implements OnInit {

  @Input() producto: Producto;
  @Output() productoPorBorrar = new EventEmitter;
  @Output() mostrarDetalles = new EventEmitter;
  @Output() anadirAlCarro = new EventEmitter;
  modoCarrito = false;
  constructor(private productosLista: ProductosListaComponent) { }

  ngOnInit() {
    this.modoCarrito = this.productosLista.modoCarrito;
  }

  borrarDelCarrito() {
    this.productoPorBorrar.emit(this.producto);
   }

   mostrarDetalle(){
     this.mostrarDetalles.emit(this.producto);
   }

   add(){
     this.anadirAlCarro.emit(this.producto);
   }
}
