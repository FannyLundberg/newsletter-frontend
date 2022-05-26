import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsubscribeService {

  private unsubscribeData = new Subject<any>();
  unsubscribeData$: Observable<any> = this.unsubscribeData.asObservable();

  constructor() { }

  // Ta bort användarens email och uppdatera status på prenumerant
  unsubscribe(user: any) {

    console.log(user);

    const unSubscriber = {
      "_id": user.userId,
      "email": "",
      "subscriber": false
    }

    fetch("https://node-newsletter.azurewebsites.net/users/unsubscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unSubscriber),
    })
    .then(response => response.json())
    .then(data => {

      console.log(data)

      if (data.message == "success") {
        return this.unsubscribeData.next("Message: OK")
      } else {
        return this.unsubscribeData.next("Message: Error")
      }
    })
    .catch((error) => {
      console.log("Error: " + error)
    })
  }

}
