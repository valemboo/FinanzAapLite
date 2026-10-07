import { Component, signal, inject} from "@angular/core";
import { PresupuestoService } from "../../services/presupuesto.service";
import { GastoService } from "../../services/gasto.service";
import { RouteReuseStrategy, RouterLink } from "@angular/router";

@Component({
    selector: 'app-ingresar-gasto',
    templateUrl:'./ingresarGastos.component.html',
    styleUrl: './ingresarGastos.css',
    standalone: true,
    imports:[RouterLink]
})
export class ingresarGastosComponent{

    public presupuestoService = inject(PresupuestoService);
    public gastoService = inject(GastoService);

    presupuestoSeleccionado = signal<number | null>(null);
    categoria = signal('');
    monto = signal(0);

    error = signal(false);
    mensajeError = signal('');

    seleccionarPresupuesto(event: Event) {

    const select = event.target as HTMLSelectElement;

    const id = Number(select.value);

    if (!select.value) {
        this.presupuestoSeleccionado.set(null);
        return;
    }

    this.presupuestoSeleccionado.set(id);

    console.log('ID seleccionado:', id);
    console.log('Presupuestos:', this.presupuestoService.presupuestos());
    }

    agregarGasto() {
        const idPresupuesto = this.presupuestoSeleccionado();
        if (idPresupuesto === null) {
            this.error.set(true);
            
            this.mensajeError.set('Debe seleccionar un presupuesto');
            return;
        }

        const presupuesto = this.presupuestoService.obtenerPresupuesto(idPresupuesto);
        console.log('ID buscado:', idPresupuesto);
        console.log('Presupuesto encontrado:', presupuesto);
        
        if (!presupuesto){
            this.error.set(true);
            
            this.mensajeError.set('El presupuesto seleccionado no existe');
            return;
        }

        if (this.categoria() === ''){
            this.error.set(true);
            
            this.mensajeError.set('Debe seleccionar una categoría');
            return;
        }

        if (this.monto() <= 0){
            this.error.set(true);
            
            this.mensajeError.set('El monto debe ser mayor a cero');
            return;
        }

        if (presupuesto.saldo <= 0) {
            this.error.set(true);

            this.mensajeError.set('Este presupuesto ya se encuentra agotado.');
            return;
        }

        if (this.monto() > presupuesto.saldo) {
            this.error.set(true);

            this.mensajeError.set(`El gasto supera el saldo disponible de ₡${presupuesto.saldo}.`);
            return;
        }

        this.gastoService.agregarGasto({
            presupuestoId: idPresupuesto,
            categoria: this.categoria(),
            monto: this.monto()
        });

        this.presupuestoService.descontarSaldo(
            idPresupuesto,
            this.monto()
        );

        this.presupuestoSeleccionado.set(null);
        this.categoria.set('');
        this.monto.set(0);

        this.error.set(false);
        this.mensajeError.set('');
    }
}