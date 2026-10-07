import { Component, inject, computed } from "@angular/core";
import { PresupuestoService } from "../../services/presupuesto.service";
import { GastoService } from "../../services/gasto.service";

@Component({
    selector: 'app-dashboard-resumen',
    templateUrl: './dashboardResumen.component.html',
    styleUrl: './dashboardResumen.component.css',
    standalone: true
})
export class DashboardResumenComponent {

    public presupuestoService = inject(PresupuestoService);
    public gastoService = inject(GastoService);

    // Cantidad de presupuestos creados
    cantidadPresupuestos = computed(() =>
        this.presupuestoService.presupuestos().length
    );

    // Cantidad de presupuestos agotados (saldo <= 0)
    cantidadPresupuestosAgotados = computed(() =>
        this.presupuestoService.presupuestos()
            .filter(p => p.saldo <= 0).length
    );

    // Mes con el presupuesto más alto (según monto)
    mesPresupuestoMasAlto = computed(() => {
        const lista = this.presupuestoService.presupuestos();

        if (lista.length === 0) return 'Sin datos';

        const mayor = lista.reduce((max, actual) =>
            actual.monto > max.monto ? actual : max
        );

        return mayor.mes;
    });

    // Categoría de gasto con mayor consumo
    categoriaMayorConsumo = computed(() => {
        const gastos = this.gastoService.gastos();

        if (gastos.length === 0) return 'Sin datos';

        const totalesPorCategoria = new Map<string, number>();

        for (const gasto of gastos) {
            const totalActual = totalesPorCategoria.get(gasto.categoria) ?? 0;
            totalesPorCategoria.set(gasto.categoria, totalActual + gasto.monto);
        }

        let categoriaTope = '';
        let montoTope = -1;

        for (const [categoria, total] of totalesPorCategoria) {
            if (total > montoTope) {
                montoTope = total;
                categoriaTope = categoria;
            }
        }

        return categoriaTope;
    });
}