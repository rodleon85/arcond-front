import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class NewContractComponent implements OnInit {
  
  form: FormGroup;
  
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  
  thirdFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      cpfCnpj: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  preventNonNumericalInput(event: KeyboardEvent): void {
    if (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-') {
      event.preventDefault();
    }
  }

  validateNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
    if (input.value.length > 14) {
      input.value = input.value.slice(0, 14);
    }
  }
}
