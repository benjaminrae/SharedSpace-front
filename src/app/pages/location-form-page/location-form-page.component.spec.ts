import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFormPageComponent } from './location-form-page.component';

describe('LocationFormPageComponent', () => {
  let component: LocationFormPageComponent;
  let fixture: ComponentFixture<LocationFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationFormPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
