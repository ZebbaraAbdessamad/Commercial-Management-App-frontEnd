import { Client } from "./client.model";


export interface ClientResponse {
  timeStamp :  Date;
  statusCode :number;
  status:string ;
  reason:string ;
  message:string ;
  developerMessage:string;
  data:{clients?:Client[] ,client?:Client};
}
