import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilerEditComponent } from './alquiler-edit.component';

describe('AlquilerEditComponent', () => {
  let component: AlquilerEditComponent;
  let fixture: ComponentFixture<AlquilerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlquilerEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlquilerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
