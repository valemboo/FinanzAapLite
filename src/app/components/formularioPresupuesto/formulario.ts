import { Component, inject, signal } from "@angular/core";
import { PresupuestoService } from "../../services/presupuesto.service";

@Component({
    templateUrl: './formulario.html',
    styleUrl: './formulario.css',
    selector:'app-formulario-presupuesto',
    standalone: true
})

export class formularioPresupuestoComponent {
    public presupuestoService = inject(PresupuestoService);

    nombrePresupuesto = signal('');
    fechaPresupuesto = signal('');
    presupuesto = signal(0);
    error = signal(false);

    addPresupuesto(){

        if (this.nombrePresupuesto().trim()=== '' || 
            this.fechaPresupuesto() === '' || 
            this.presupuesto() <= 0)
            {
                this.error.set(true);
                return;
            }

            this.error.set(false);

            this.presupuestoService.addPresupuesto({
                nombre: this.nombrePresupuesto(),
                mes: this.fechaPresupuesto(),
                monto: this.presupuesto()
            });

            //Limpiar formulario
            this.nombrePresupuesto.set('');
            this.fechaPresupuesto.set('');
            this.presupuesto.set(0);
    }
}