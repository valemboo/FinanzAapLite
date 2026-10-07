import { Component, inject } from "@angular/core";
import { ingresarGastosComponent } from "../../components/ingresarGastos/ingresarGastos.component";
import { listaPresupuestosComponent } from "../../components/listaPresupuestos/listaPresupuestos";
import { PresupuestoService } from "../../services/presupuesto.service";
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';

@Component({ //Enlazar
    templateUrl:'./administrarGastos.html', // Indicar qué quiero mostrar
    styleUrl: './administrarGastos.css', // Indicar la estética
    standalone: true,
    imports: [ingresarGastosComponent, listaPresupuestosComponent, NavbarComponent]
})
export class AdministrarGastosComponent{
    public presupuestoService = inject(PresupuestoService);

}