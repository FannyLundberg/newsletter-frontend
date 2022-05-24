import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  
  private subscribeData = new Subject<any>();
  subscribeData$: Observable<any> = this.subscribeData.asObservable();

  // user: IUser[] = [];
  
  constructor() { }

  // Posta användarens email och uppdatera status på prenumerant
  subscribe(user: any) {

    console.log(user);

    const subscriber = {
      "_id": user.userId,
      "subscriber": true
    }

    fetch("http://localhost:3000/users/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriber),
    })
    .then(response => response.json())
    .then(data => {

      console.log(data)

      if (data.message == "success") {
        return this.subscribeData.next("Message: OK")
      } else {
        return this.subscribeData.next("Message: Error")
      }
    })
    // Vid error
    .catch((error) => {
      console.log("Error: " + error)
    })
  }

}
