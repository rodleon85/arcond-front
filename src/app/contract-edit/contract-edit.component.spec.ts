import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractEditComponent } from './contract-edit.component';

describe('ContractEditComponent', () => {
  let component: ContractEditComponent;
  let fixture: ComponentFixture<ContractEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractEditComponent]
    });
    fixture = TestBed.createComponent(ContractEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
