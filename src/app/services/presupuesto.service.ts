import { effect, Injectable, signal } from "@angular/core";
import { Presupuesto } from "../interfaces/presupuesto.interface";

const loadFromLocalStorage = (): Presupuesto[] => {

    const presupuestos = localStorage.getItem('Presupuestos');
    return presupuestos ? JSON.parse(presupuestos) : [];
}

@Injectable({ providedIn: 'root' })
export class PresupuestoService {

    presupuestos = signal<Presupuesto[]>(loadFromLocalStorage());

    saveToLocalStorage = effect(() => {
        console.log(`Conteo de presupuestos ${this.presupuestos().length}`);
        localStorage.setItem('Presupuestos', JSON.stringify(this.presupuestos()));
    });

    addPresupuesto(presupuesto: Omit<Presupuesto,'id' | 'saldo'>) 
    {
        const listaActual = this.presupuestos();
        const newId = listaActual.length > 0 ? Math.max(...listaActual.map(p => p.id)) + 1 : 1;
        const nuevoPresupuesto: Presupuesto = {
            id: newId,
            nombre: presupuesto.nombre,
            mes: presupuesto.mes,
            monto: presupuesto.monto,
            saldo: presupuesto.monto
        };

        this.presupuestos.update((list) => [...list, nuevoPresupuesto]);
    }

    obtenerPresupuesto(id: number){
        return this.presupuestos().find(
            presupuesto => presupuesto.id === id
        );
    }

    descontarSaldo(id: number, cantidad: number) {
        this.presupuestos.update(lista => lista.map(presupuesto => {
            if (presupuesto.id === id) {
                return {
                    ...presupuesto,
                    saldo: presupuesto.saldo - cantidad
                };
            }

            return presupuesto;
        })
        );
    }
}