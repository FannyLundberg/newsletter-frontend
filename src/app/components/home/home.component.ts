import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { AddUserService } from 'src/app/services/add-user.service';
import { CheckUserService } from 'src/app/services/check-user.service';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';

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
  subscribeData: any;
  subscriber: boolean = false;

  constructor(
    private checkUserService: CheckUserService, 
    private addUserService: AddUserService,
    private subscribeService: SubscribeService,
    private unSubscribeService: UnsubscribeService
    ) { }

  ngOnInit(): void {

    // Check om inloggningsuppgifterna stämde
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

    // Check om status för prenumeration har förändrats
    this.subscribeService.subscribeData$.subscribe(subscribeInfo => {
      this.subscribeData = subscribeInfo;

      if (this.subscribeData === "Message: OK") {
        console.log("Du prenumererar nu!")
        this.subscriber = true;
      } else {
        console.log("Något gick fel när du skulle börja prenumerera")
        this.subscriber = false;
      }
    })

    // Check om det finns något i localStorage
    if (localStorage.length > 0) {
      this.correctLogin = true;

      let loggedInSubscriber = localStorage.getItem("subscriber")

      if (loggedInSubscriber === "true") {
        console.log("Prenumerant")
        this.subscriber = true;
      } 

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

    this.ngOnInit();
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
      "password": newPassword,
      "email": "",
      "subscriber": false
    }

    this.addUserService.addUser(newUser)
  }


  // Klick på submit för att prenumerera
  subscribe(email: string) {
    console.log("Klick på submit för prenumeration")

    const userId = localStorage.getItem("userId");

    const subscriber = {
      "userId": userId,
      "email": email,
      "subscriber": true
    }

    this.subscribeService.subscribe(subscriber);
    localStorage.setItem("subscriber", "true")
  }

  // Klick på Avbryt prenumeration
  unsubscribe() {
    console.log("Klick på Avbryt prenumeration")

    const userId = localStorage.getItem("userId");

    const unSubscriber = {
      "userId": userId,
      "email": "",
      "subscriber": false
    }

    this.unSubscribeService.unsubscribe(unSubscriber);
    localStorage.setItem("subscriber", "false");

    this.subscriber = false;
  }


  // Vid klick på Logga ut-knappen
  logOut() {
    console.log("Klickat på Logga ut-knappen")
    
    localStorage.clear();

    this.ngOnInit();
  }
}
