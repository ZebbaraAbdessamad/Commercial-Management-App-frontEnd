import { ClientResponse } from './../models/client-response.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url=environment.host;
  constructor(private http:HttpClient) { }

  httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

    //display all customers
    listClients():Observable<ClientResponse>{
      return this.http.get<ClientResponse>(this.url+`/client/list`)
        .pipe(  tap(console.log),
                catchError(this.handleError),
                map((response: any) => {
                return response;
                })
      );
    }

    //store customer
    SaveClient(clientDto:string , image:File): Observable<ClientResponse> {
      const json = JSON.stringify(clientDto);
      const blob = new Blob([json], {
        type: 'application/json'
      });

      const formData = new FormData();
      formData.append("image", image);
      formData.append("clientDto", blob);
      console.log("image after",formData.get('image'))
      console.log("clientDto after",formData.get('clientDto'))

      return this.http.post<ClientResponse>(this.url + "/client/save/", formData).pipe(
        tap(console.log),
        catchError(this.handleError)
      );
    }


    //get client by id:
    getClient(clientId:any):Observable<ClientResponse>{
      return  this.http.get<ClientResponse>(this.url+`/client/id/`+clientId).pipe(
        tap(console.log),
        catchError(this.handleError)
      );
    }


  //update client
  onUpdate(clientDto:string , image:File):Observable<ClientResponse>{
    const json = JSON.stringify(clientDto);
    const blob = new Blob([json], {
      type: 'application/json'
    });

    const formData = new FormData();
    formData.append("image", image);
    formData.append("clientDto", blob);
    console.log("image after",formData.get('image'));
    console.log("clientDto after",formData.get('clientDto'));

    return this.http.put<ClientResponse>(this.url + "/client/update/", formData).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }


  private handleError(error :HttpErrorResponse ):Observable<never>{
    console.log(error )
    return throwError(`An error occurred - Error code : ${error.status}`);
  }



    // uploadImage(image: File): Observable<ClientResponse> {
    //   return this.http.post<ClientResponse>(this.url+`/client/upload-imag/`,image ,this.httpOptions).pipe(
    //     tap(console.log),
    //     catchError(this.handleError)
    //   );
    // }

}
