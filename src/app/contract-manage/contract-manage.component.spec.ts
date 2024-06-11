import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractManageComponent } from './contract-manage.component';

describe('ContractManageComponent', () => {
  let component: ContractManageComponent;
  let fixture: ComponentFixture<ContractManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractManageComponent]
    });
    fixture = TestBed.createComponent(ContractManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
