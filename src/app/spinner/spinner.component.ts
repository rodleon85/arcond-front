import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../_services/spinner.service';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.spinnerService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}
