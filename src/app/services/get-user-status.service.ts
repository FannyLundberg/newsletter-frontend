import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserStatusService {

  private subscribeInfo = new Subject<any>();
  subscribeInfo$: Observable<any> = this.subscribeInfo.asObservable();
  
  constructor() { }

  // Kollar status på prenumerant
  isSubscriber(userId: any) {

    console.log(userId);

    const checkIfSubscriber = {
      "_id": userId,
    }

    console.log(checkIfSubscriber)

    fetch("http://localhost:3000/users/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkIfSubscriber),
    })
    .then(response => response.json())
    .then(data => {

      console.log(data)

      if (data.message == "success") {
        return this.subscribeInfo.next(data)
      } else {
        return this.subscribeInfo.next("Message: Error")
      }
    })
    .catch((error) => {
      console.log("Error: " + error)
    })
  }
}
