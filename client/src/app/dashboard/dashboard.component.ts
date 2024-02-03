import { Component, OnInit } from "@angular/core";
import { TrylinksService } from "../trylinks.service";
import { Router } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  user = "loading...";
  constructor(
    private tryLinksService: TrylinksService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe((u) => {
      this.user = u.nickname;
    });
  }

  navToInteractivePage(): void {
    this.router.navigate(["interactive"]);
  }

  navToTutorialPage(): void {
    this.router.navigate(["tutorial", this.tryLinksService.lastTutorialId]);
  }
}
