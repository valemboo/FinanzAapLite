import { effect, Injectable, signal } from "@angular/core";
import { Gasto } from "../interfaces/gasto.interface";

const loadFromLocalStorage = (): Gasto[] => {
    const gastos = localStorage.getItem('Gastos');
    return gastos ? JSON.parse(gastos) : [];
};

@Injectable({providedIn: 'root'})
export class GastoService {

    gastos = signal<Gasto[]>(loadFromLocalStorage());

    saveToLocalStorage = effect(() => {
        console.log(`Conteo de gastos: ${this.gastos().length}`);
        localStorage.setItem('Gastos',JSON.stringify(this.gastos()));
    });

    agregarGasto( gasto: Omit<Gasto, 'id'>
    ) {
        const listaActual = this.gastos();
        const nuevoId = listaActual.length > 0 ? Math.max(...listaActual.map(g => g.id)) + 1 : 1;

        const nuevoGasto: Gasto = {
            id: nuevoId,
            presupuestoId: gasto.presupuestoId,
            categoria: gasto.categoria,
            monto: gasto.monto
        };

        this.gastos.update(lista => [...lista,nuevoGasto]);
    }
}