import {Component} from '@angular/core';
import {ButtonComponent} from '../../shared/components/button/button.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    ButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {
  }

  handleNavigateTo(route: string) {
    this.router.navigateByUrl(route);
  }
}
