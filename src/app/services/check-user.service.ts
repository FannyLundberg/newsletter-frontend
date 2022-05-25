import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class CheckUserService {

  private userData = new Subject<any>();
  userData$: Observable<any> = this.userData.asObservable();

  user: IUser[] = [];
  
  constructor() { }

  // Kontrollera om användare har angett rätt uppgifter
  checkUser(user: IUser) {

    console.log(user);

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {

      console.log(data)

      if (data.message == "success") {

        // Spara userId till localStorage
        localStorage.setItem("userId", data.userId)

        return this.userData.next(data)

      } else {

        return this.userData.next("Message: Error")

      }
      
    })
    .catch((error) => {

      console.log("Error: " + error)
    })
  }
}
