import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { StartComponent } from './start/start.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InteractiveComponent } from './interactive/interactive.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  {
    path: 'welcome',
    data: { title: 'Welcome to TryLinks' },
    component: WelcomeComponent
  },
  {
    path: 'start',
    data: { title: 'TryLinks' },
    component: StartComponent
  },
  {
    path: 'dashboard',
    data: { title: 'TryLinks Dashboard' },
    component: DashboardComponent
  },
  {
    path: 'interactive',
    data: { title: 'TryLinks Interactive Mode' },
    component: InteractiveComponent
  },
  {
    path: 'tutorial/:id',
    data: { title: 'TryLinks Tutorial Mode' },
    component: TutorialComponent
  },
  {
    path: '**',
    redirectTo: '/welcome'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
