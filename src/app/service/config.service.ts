import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  tokenName : string = "forwardClient_ver1";
  objName : string = "forwardClient_obj";
  objUser : string = "forwardUser_obj";
  secretKey : string = "YourSecretKeyForEncryption&Descryption";

  varKey: string = "mXTSxrEKSErYnZb33LyBus5RpVtGNfcgEBqxp5Unk5azj4ZgdWfhkfVDKJ3KSLFG7DtecSehXe7Q67NGFWGehU3ANexas3ZbrkfU";
  varToken: string;
  varHeaders: any = [];  
  constructor( 
    private localstorage : LocalstorageService,
    private router : Router,

  ) { 
    this.varToken = "tokentest";

  }


  headers() {    
    return this.varHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Key': this.varKey,
      'Token': this.token(),
    });
  }

  removeToken(){
    localStorage.removeItem(this.tokenName);
    localStorage.removeItem(this.objName);
    
  }

  token() : any{
    return  localStorage.getItem(this.tokenName) !== null ? localStorage.getItem(this.tokenName) : false;
  } 

  setToken(data){
    localStorage.setItem(this.tokenName, data);
  }
  setObj(data){
    localStorage.setItem(this.objName,  JSON.stringify(data));
  }

  getUser(){
    return  localStorage.getItem(this.objUser) !== null ? localStorage.getItem(this.objUser) : false;
  }

  getObj(){
    return false;
  }
  relogin(data){
    if(data['error'] === 400){
      this.router.navigate(['relogin']);
    }
  }
}
