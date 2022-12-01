import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLocationsPageComponent } from './my-locations-page.component';

describe('MyLocationsPageComponent', () => {
  let component: MyLocationsPageComponent;
  let fixture: ComponentFixture<MyLocationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLocationsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLocationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
