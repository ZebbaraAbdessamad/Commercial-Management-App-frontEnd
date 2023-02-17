import { ClientActionTypes } from './../../enums/client-action-types.enum';
import { BehaviorSubject } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventDriverService } from 'src/app/shared/services/event.driver.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  private isloading = new BehaviorSubject<boolean>(false);

  @Input()  isloading$ = this.isloading.asObservable();

  constructor(    private eventDrivenService:EventDriverService) { }

  ngOnInit(): void {

  }

  SaveClient(clientForm:NgForm){
    this.eventDrivenService.publishEvent({ type:ClientActionTypes.NEW_CLIENT,payload:clientForm})
  }

  onFileSelected($event:any){
    this.eventDrivenService.publishEvent({ type:ClientActionTypes.OTHER,payload:$event})
  }

}
