import { Routes } from '@angular/router';
import { CrearPresupuestoComponent } from './pages/crearPresupuesto/crearPresupuesto';
import { AdministrarGastosComponent } from './pages/administrarGastos/administrarGastos';
import { welcomeComponent } from './pages/welcome/welcome';
import { operacionesComponent } from './pages/operaciones/operaciones';
import { dashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [

    {
        path: "",
        component: welcomeComponent,
    },

    {
        path: "presupuesto",
        component: CrearPresupuestoComponent,
    },
    
    {
        path: "administrar",
        component: AdministrarGastosComponent,
    },

    {
        path: "operaciones",
        component: operacionesComponent
    },
    
    {
        path: "dashboard",
        component: dashboardComponent
    }
];