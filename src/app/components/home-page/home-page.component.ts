import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LinksDirective } from '../../directives/links.directive';

@Component({
  selector: 'app-home-page',
  standalone: true,

  imports: [RouterLink,RouterOutlet ,MatToolbarModule, MatButtonModule,LinksDirective],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
