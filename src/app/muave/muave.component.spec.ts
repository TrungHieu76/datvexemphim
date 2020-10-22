import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuaveComponent } from './muave.component';

describe('MuaveComponent', () => {
  let component: MuaveComponent;
  let fixture: ComponentFixture<MuaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
