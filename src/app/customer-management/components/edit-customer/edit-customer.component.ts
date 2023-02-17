import { Observable, BehaviorSubject, map, of } from 'rxjs';
import { AppState } from 'src/app/shared/models/app-state';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../models/client.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientResponse } from '../../models/client-response.model';
import { DataState } from 'src/app/shared/enums/data-state.enum';
import { catchError, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  clientId:any;
  client?:Client;
  clientForm!: FormGroup;
  submitted:boolean=false;
  image!: File;


  appState$?: Observable<AppState<ClientResponse>>;
  private dataSubject = new BehaviorSubject<ClientResponse | null>(null);
  readonly DataState = DataState;


  constructor(private activatedRoute:ActivatedRoute ,
              private clientService:ClientService,
              private fb: FormBuilder) {
    this.clientId=activatedRoute.snapshot.params?.['id'];
   }

  ngOnInit(): void {

    this.appState$ =  this.clientService.getClient(this.clientId)
    .pipe(
      map(response =>{
        this.client=response.data.client;
        this.clientForm = this.fb.group({
          id: [this.client?.id],
          prenom: [this.client?.prenom, Validators.required],
          nom: [this.client?.nom, Validators.required],
          email: [this.client?.email, [Validators.required, Validators.email]],
          password: [this.client?.password, Validators.required],
          username: [this.client?.username, Validators.required],
          address: [this.client?.address, Validators.required],
          telephone: [this.client?.telephone, Validators.required],
          codePostal: [this.client?.codePostal, Validators.required],
          image: [''],
          status: [this.client?.status, Validators.required]
        });
        return {dataState:DataState.LOADED_STATE }
      }),
      startWith({dataState:DataState.LOADING_STATE ,appData: this.dataSubject?.value}),
      catchError((error:string)=>{
        return of({dataState:DataState.ERROR_STATE ,error})
      }));





  }

   //get image information
    onFileSelected($event:any) {
      this.image = $event.target.files[0];
    }

   //method update
   onUpdateCustomer(){
    console.log("nnbjbvvv=========>",this.clientForm.value.telephone)
    this.submitted=true;
    if(this.clientForm.invalid) return;

    this.appState$ = this.clientService.onUpdate(this.clientForm.value ,this.image)
    .pipe(map(response =>{
      this.client=response.data.client;
      return {dataState:DataState.LOADED_STATE  }
    }),
    startWith({dataState:DataState.LOADED_STATE}),
    catchError((error:string)=>{
      return of({dataState:DataState.ERROR_STATE ,error})
    }));
   }




}
