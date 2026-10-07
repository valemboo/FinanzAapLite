import { Component, inject, signal } from "@angular/core";
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';
import { formularioPresupuestoComponent } from "../../components/formularioPresupuesto/formulario";
import { listaPresupuestosComponent } from "../../components/listaPresupuestos/listaPresupuestos";

@Component({
    templateUrl: './crearPresupuesto.html',
    styleUrl: './crearPresupuesto.css',
    standalone: true,
    imports: [NavbarComponent, formularioPresupuestoComponent, listaPresupuestosComponent ]
})
export class CrearPresupuestoComponent {

}