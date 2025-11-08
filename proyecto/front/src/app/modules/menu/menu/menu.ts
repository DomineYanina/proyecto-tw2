import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, ButtonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu{

}
