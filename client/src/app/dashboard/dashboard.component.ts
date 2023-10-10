import { Component, OnInit } from '@angular/core';
import { TrylinksService } from '../trylinks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private tryLinksService: TrylinksService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.username === 'unknown user') {
      this.logout();
    }
  }

  get username() {
    return this.tryLinksService.username;
  }

  logout() {
    this.tryLinksService
      .logout()
      .subscribe(_ => this.router.navigate(['welcome']));
  }

  navToInteractivePage(): void {
    this.router.navigate(['interactive']);
  }

  navToTutorialPage(): void {
    this.router.navigate(['tutorial', this.tryLinksService.lastTutorialId]);
  }
}
