import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichsuGdComponent } from './lichsu-gd.component';

describe('LichsuGdComponent', () => {
  let component: LichsuGdComponent;
  let fixture: ComponentFixture<LichsuGdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichsuGdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichsuGdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
