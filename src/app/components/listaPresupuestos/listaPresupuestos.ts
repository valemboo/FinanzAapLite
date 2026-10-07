import { Component, inject } from "@angular/core";
import { PresupuestoService } from "../../services/presupuesto.service";


@Component({
    selector: 'app-lista-presupuestos',
    templateUrl:'./listaPresupuestos.html',
    styleUrl: './listaPresupuestos.css',
})
export class listaPresupuestosComponent{
    public presupuestoService = inject(PresupuestoService);
}