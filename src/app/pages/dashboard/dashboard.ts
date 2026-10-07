import { Component } from "@angular/core";
import { NavbarComponent } from '../../components/shared/navbar/navbar.component';
import { DashboardResumenComponent } from "../../components/dashboardResumen/dashboardResumen.component";

@Component({
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css',
    standalone: true,
    imports: [NavbarComponent, DashboardResumenComponent ]
})
export class dashboardComponent {

}