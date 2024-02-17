import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  envName: string;
  constructor(private router: Router) {
    this.envName = environment.envName || '';
  }

  ngOnInit() {
  }
  login(){
    this.router.navigate(['/dashboard']);
  }

  navToStartPage(): void {
    this.router.navigate(['start']);
  }

}
