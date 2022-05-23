import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor() { }

  // Lägga till ny användare
  addUser(newUser: IUser) {
    console.log(newUser);
    
    const addUser = {
      "username": newUser.username,
      "password": newUser.password
    }

    fetch("http://localhost:3000/users/newuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addUser),
    })
    .then(response => response.json())
    .then(data => {

      console.log(data)

      if (data.message == "success") {
        console.log("Du har skapat en ny användare")
      } else {
        console.log("Fel vid skapadet av nytt inlogg")
      }
    })
    // Vid error
    .catch((error) => {

      console.log("Error: " + error)
    })
  }
}
