import { Component, OnInit } from '@angular/core';
import { AddUserService } from 'src/app/services/add-user.service';
import { CheckUserService } from 'src/app/services/check-user.service';
import { GetUserStatusService } from 'src/app/services/get-user-status.service';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  createUser: boolean = false;
  user: any;
  userData: any;
  wrongLogin: boolean = false;
  correctLogin: boolean = false;
  subscribeData: any;
  subscriber: boolean = false;
  newUser: boolean = false;

  constructor(
    private checkUserService: CheckUserService, 
    private addUserService: AddUserService,
    private subscribeService: SubscribeService,
    private unSubscribeService: UnsubscribeService,
    private getUserStatusService: GetUserStatusService
    ) { }

  ngOnInit(): void {

    // Check om inloggningsuppgifterna stämde
    this.checkUserService.userData$.subscribe(data => {
      this.userData = data;

      console.log(this.userData)

      if (this.userData.message === "success") {
        
        console.log("Korrekt inloggningsuppgifter")
        this.correctLogin = true; 

        this.checkSubscribtion();
       
      } else {
        console.log("Felaktiga inloggningsuppgifter")
        
        this.wrongLogin = true;
        this.correctLogin = false;
      }
    })

    // Check om det finns något i localStorage
    if (localStorage.length > 0) {
      this.correctLogin = true;
      this.checkSubscribtion();
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


  // Check om det är en prenumerant eller ej
  checkSubscribtion() {
    let userId = localStorage.getItem("userId")
    this.getUserStatusService.isSubscriber(userId);

    this.getUserStatusService.subscribeInfo$.subscribe(data => {
      this.subscribeData = data;

      if (this.subscribeData.subscriber == true) {
        console.log("Du är en prenumerant")
        this.subscriber = true;

      } else {
        console.log("Du är inte en prenumerant")
        this.subscriber = false;
      }
    })
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

    this.newUser = true;
  }


  // Klick på submit för att prenumerera
  subscribe() {
    console.log("Klick på submit för prenumeration")

    const userId = localStorage.getItem("userId");

    const subscriber = {
      "userId": userId,
      "subscriber": true
    }

    this.subscribeService.subscribe(subscriber);
    this.subscriber = true;
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
    this.subscriber = false;
  }


  // Vid klick på Logga ut-knappen
  logOut() {
    console.log("Klickat på Logga ut-knappen")
    
    localStorage.clear();
    this.ngOnInit();
  }
}
