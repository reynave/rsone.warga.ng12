import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';

declare var $ : any;

export class Model {
  constructor(
    public id: number,
    public subject: string,
    public note: string,
    public supportFormId: number,
    public supportStatusId: number,
    public rt_userId: number,
    public rw_userId: number,
    public userId: number
  ) { } 
}

export class ModelForm {
  constructor(
    public id: number,
    public ticketNumber: string,
    public f1: string,
    public f2: string,
    public f3: string,
    public f4: string,
    public f5: string,
    public f6: string,
    public f7: string,
    public f8: string,
    public f9: string,
    public f10: string,
    public f11: string,
    public f12: string,
    public f13: string,
    public f14: string,
    public f15: string,
    public f16: string,
    public f17: string,
    public f18: string,
    public f19: string,
    public f20: string,
    public f21: string,
    public f22: string,
    public f23: string,
    public f24: string,
    public f25: string
  ) { } 
}

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.css']
})
export class SupportFormComponent implements OnInit {

  model : any = new Model(0,"","",1,1,0,0,0);
  username : string = JSON.parse(localStorage.getItem("forwardClient_obj")).username || '{}';
  modelform : any = new ModelForm(0,"","",this.username,"","","","","","","","","","","","","","","","","","","","","","","");
  uId : string = JSON.parse(localStorage.getItem("forwardClient_obj")).name; // Untuk mendapatkan ID User yg login.
  ticketNumber : string = "";
 
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.model.userId = parseInt(this.uId);
      this.getHttp();
  }

  getHttp() {
    this.http.get<any>(environment.api + "support/getTicketNumber/"+this.model.userId+"/1", {
      headers: this.configService.headers()
    }).subscribe(
      data => { 
        console.log(data); 
        this.ticketNumber = data.items;
      },
      error => {
        console.log(error);
      },
    );
  }

  onAutoSave(field:string,formModel:any){
    const body = {
      data : {field : field,value : formModel, ticketNumber : this.ticketNumber}
    }
    
    this.http.post<any>(environment.api + "support/onAutoSave", body, {
       headers: this.configService.headers()
    }).subscribe(
       data => { 
         $(document).ready( function(){
             $('#'+field+'_saved').show("fast", function(){ $(this).fadeOut("slow") });
         });
       },
       error => {
         console.error(error);
    });
  }

  onAutoSaveForm(field:string,formModel:any){
    const body = {
      data : {field : field,value : formModel, ticketNumber : this.ticketNumber, userId : this.uId, supportFormId : 4}
    }
    
    this.http.post<any>(environment.api + "support/onAutoSaveForm", body, {
       headers: this.configService.headers()
    }).subscribe(
       data => { 
         $(document).ready( function(){
             $('#'+field+'_saved').show("fast", function(){ $(this).fadeOut("slow") });
         });
       },
       error => {
         console.error(error);
    });
  }

  onSubmit(){
    const body = {
      data : {userId : this.uId, subject : this.model.subject, note : this.model.note, supportFormId : 1, ticketNumber : this.ticketNumber},
    }
    
    this.http.post<any>(environment.api + "support/onSubmit", body, {
       headers: this.configService.headers()
    }).subscribe(
       data => { 
         this.router.navigate(['support']);
       },
       error => {
         console.log(error);
    });
 }

 back(){
   window.history.back()
 }

}
