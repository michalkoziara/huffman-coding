import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgkComponent } from './fgk.component';

describe('FgkComponent', () => {
  let component: FgkComponent;
  let fixture: ComponentFixture<FgkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
