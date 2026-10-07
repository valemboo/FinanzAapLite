import { Component } from "@angular/core";
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";
import { RouterLink } from "@angular/router";

@Component({
    templateUrl: './operaciones.html',
    styleUrl: './operaciones.css',
    imports: [RouterLink, NavbarComponent]
})

export class operacionesComponent {

}