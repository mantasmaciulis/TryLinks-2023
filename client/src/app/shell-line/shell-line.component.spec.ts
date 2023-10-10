import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellLineComponent } from './shell-line.component';

describe('ShellLineComponent', () => {
  let component: ShellLineComponent;
  let fixture: ComponentFixture<ShellLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
