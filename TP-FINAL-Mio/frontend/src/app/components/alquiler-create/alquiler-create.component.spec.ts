import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilerCreateComponent } from './alquiler-create.component';

describe('AlquilerCreateComponent', () => {
  let component: AlquilerCreateComponent;
  let fixture: ComponentFixture<AlquilerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlquilerCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlquilerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
