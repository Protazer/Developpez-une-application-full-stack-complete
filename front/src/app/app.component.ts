import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './core/components/header/header.component';
import {Subscription} from 'rxjs';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  public showHeader!: boolean;
  public navigationSubscription = new Subscription();

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.showHeader = val.url != '/';
      }
    })
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
}
