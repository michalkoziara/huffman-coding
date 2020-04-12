import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VitterComponent } from './vitter.component';

describe('VitterComponent', () => {
  let component: VitterComponent;
  let fixture: ComponentFixture<VitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
