import { NgForm } from '@angular/forms';
import { ClientActionTypes } from './../../enums/client-action-types.enum';
import { ClientActions } from './../../models/client-actions';
import { DataState } from './../../../shared/enums/data-state.enum';
import { ClientResponse } from './../../models/client-response.model';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { BehaviorSubject, Observable, of ,map } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';
import { AppState } from 'src/app/shared/models/app-state';
import { EventDriverService } from 'src/app/shared/services/event.driver.service';
import { Client } from '../../models/client.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  page:any = 1;
  pageSize:any = 3;
  collectionSize:any;

  appState$?: Observable<AppState<ClientResponse>>;
  private dataSubject = new BehaviorSubject<ClientResponse | null>(null);

  readonly DataState = DataState;

  private isloading = new BehaviorSubject<boolean>(false);
  isloading$ = this.isloading.asObservable();

  image!: File;

  constructor(private clientService: ClientService,
              private eventDrivenService:EventDriverService,
              private router:Router,) {}



  ngOnInit(): void {

    this.eventDrivenService.sourceEventSubjectObservable.subscribe((eventAction:ClientActions)=>{
      this.onActionEvent(eventAction);
    });

    this.appState$ =  this.clientService.listClients()
    .pipe(
      map(response =>{
        console.log("test clients",response.data.clients)
        this.dataSubject?.next(response);
        return {dataState:DataState.LOADED_STATE  ,appData:{...response ,data:{clients:response.data.clients?.reverse()}}}
      }),
      startWith({dataState:DataState.LOADING_STATE }),
      catchError((error:string)=>{
        return of({dataState:DataState.ERROR_STATE ,error})
      })

    );

  }

 //get image information
  onFileChange($event:any) {
    this.image = $event.target.files[0];
  }

  //go to page edit
  onEdit(client:Client){
    this.router.navigateByUrl('customer/edit-customer/'+client.id)
  }

  //save client
   onAddClient(clientForm:NgForm){
    this.isloading.next(true);
    this.appState$ = this.clientService.SaveClient(clientForm.value ,this.image)
      .pipe(
      map(response =>{
        if (this.dataSubject?.value?.data.clients  && response.data.client) {
          this.dataSubject?.next(
            {...response,data:{clients:[response.data.client,...this.dataSubject.value?.data.clients]}}
          );
        }
        document.getElementById('closeModal')?.click();
        this.isloading.next(false);
        return {dataState:DataState.LOADED_STATE  ,appData: this.dataSubject?.value}
      }),
      startWith({dataState:DataState.LOADED_STATE ,appData: this.dataSubject?.value}),
      catchError((error:string)=>{
        this.isloading.next(false);
        return of({dataState:DataState.ERROR_STATE ,error})
      })

    );
  }

  onActionEvent(event:ClientActions){
    switch(event.type){
     case ClientActionTypes.NEW_CLIENT:this.onAddClient(event.payload); break;
     case ClientActionTypes.OTHER:this.onFileChange(event.payload); break;
    }
   }

}
