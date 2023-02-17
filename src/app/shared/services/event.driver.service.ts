import { ClientActions } from './../../customer-management/models/client-actions';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventDriverService {

  //pour publier un evenement | utilisé pour centraliser tous les evenments dans un seule subject
  sourceEventSubject:Subject<ClientActions>=new Subject<ClientActions>();

  //pour ecouter à les evenements lorsque utilise subscribe
  sourceEventSubjectObservable=this.sourceEventSubject.asObservable();

  //function who use for publish event

  publishEvent(event:ClientActions){
    this.sourceEventSubject.next(event);
  }

}
