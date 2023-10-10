import { Component, OnInit, Input } from '@angular/core';
import { ShellLineModel, LineType } from './shell-line.model';

@Component({
  selector: 'app-shell-line',
  templateUrl: './shell-line.component.html',
  styleUrls: ['./shell-line.component.scss']
})
export class ShellLineComponent implements OnInit {

  @Input()
  line: ShellLineModel;

  constructor() { }

  ngOnInit() {
  }

  getColor(): string {
    switch (this.line.type) {
      case LineType.introduction:
        return 'grey';
      case LineType.userInput:
        return 'white';
      case LineType.stdout:
        return 'greenyellow';
      case LineType.stderr:
        return 'red';
      default:
        return '';
    }
  }

}
