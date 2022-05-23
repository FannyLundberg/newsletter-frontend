import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { AddUserService } from 'src/app/services/add-user.service';
import { CheckUserService } from 'src/app/services/check-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  createUser: boolean = false;
  user: any = [];
  userData: any;
  wrongLogin: boolean = false;
  correctLogin: boolean = false;

  constructor(private checkUserService: CheckUserService, private addUserService: AddUserService) { }

  ngOnInit(): void {

    this.checkUserService.userData$.subscribe(data => {
      this.userData = data;

      if (this.userData === "Message: OK") {
        console.log("Korrekt inloggningsuppgifter")
        this.correctLogin = true; 
      } else {
        console.log("Felaktiga inloggningsuppgifter")
        this.wrongLogin = true;
        this.correctLogin = false;
      }
    })

    if (localStorage.length > 0) {
      this.correctLogin = true;
    } else {
      this.correctLogin = false;
    }
  }


  // Vid klick på Logga in-knappen
  checkUser(userName: string, password: string) {
    console.log("Användarnamn: " + userName, "Lösenord: " + password);

    this.user = {
      "username": userName,
      "password": password
    }

    this.checkUserService.checkUser(this.user);
  }


  // Vid klick på ny användare som vill skapa inlogg
  createNewUser() {
    this.createUser = !this.createUser;
    console.log("Klickat på skapa ny användare")
  }


  // Vid klick på Skapa ny användare-knappen för att spara ny användare
  saveNewUser(newUserName: string, newPassword: string) {
    console.log("Klickat på spara ny användare")

    const newUser = {
      "username": newUserName,
      "password": newPassword
    }

    this.addUserService.addUser(newUser)
  }


  // Vid klick på Logga ut-knappen
  logOut() {
    console.log("Klickat på Logga ut-knappen")
    
    localStorage.removeItem("userId");

    this.ngOnInit();
  }
}
