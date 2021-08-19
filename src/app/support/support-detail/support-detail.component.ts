import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

declare var $ : any;

export class Model {
  constructor(
    public id: number,
    public subject: string,
    public note: string,
    public supportFormId: number,
    public supportStatusId: number,
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
  ) { } 
}

@Component({
  selector: 'app-support-detail',
  templateUrl: './support-detail.component.html',
  styleUrls: ['./support-detail.component.css']
})


export class SupportDetailComponent implements OnInit {
  navgatorTop : boolean = true;
  items: any = [];
  obj: any = [];
  showList: boolean = true;
  showDetail: boolean = false;
  showButton: boolean = false;
  id_user_access: number;
  new_tab: string;
  is_read: boolean = false;
  is_approved: boolean = false;
  action: any = [];
  read_by: string;
  ticket :string;
  is_readonly: boolean = true;
  plaintext: string = '-plaintext';
  modelform : any = new ModelForm(0,"","","","","","","","","","","","","","","","","","","","","");
  model : any = new Model(0,"","",0,0);
  
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private activatedRoute : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.ticket = this.activatedRoute.snapshot.paramMap.get('ticket');
    this.getHttp(this.ticket);
  }

 
  getHttp(ticket) {
    console.log(environment.api + "support/detail/" +ticket);
    this.http.get<any>(environment.api + "support/detail/" +ticket, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.items = data['items'];
        this.obj = data['items'][0];
        this.model = this.obj;
        this.modelform = this.obj;
        if(this.obj.supportStatusId == 1){
             this.is_readonly = false;
             this.plaintext = '';
             this.showButton = true;
        }
        if(this.obj.approval_status == "1"){
             this.is_read = true;
        }
        let fro = '';
        if (this.obj.supportFormId == '2') { // izin
           fro = 'izin';
        }
        else if (this.obj.supportFormId == '4') {
            fro = 'renov';
        }
        else if (this.obj.supportFormId == '1') {
            fro = 'deposit';
        }
        this.new_tab =  environment.apiAdmin + 'index/' + fro + '?ticket=' + (this.ticket ? this.ticket : '') + '&action=print';
        console.log(data);
      },
      error => {
        console.log(error);
      },
    );

    this.http.get<any>(environment.api + "support/getAccess/?ticket=" + ticket, {
      headers: this.configService.headers()
    }).subscribe(
      res => {
        console.info(res);
        this.action = res;
      },
      error => {
        console.log(error);
      },
    );

  }


  onAutoSave(field:string,formModel:any){
    const body = {
      data : {field : field,value : formModel, ticketNumber : this.obj.ticketNumber, supportFormId : this.obj.supportFormId}
    };
    
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
      data : {field : field,value : formModel, ticketNumber : this.obj.ticketNumber, supportFormId : 2}
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
      data : {subject : this.modelform.f1, note : this.obj.note, supportFormId : this.obj.supportFormId, ticketNumber : this.obj.ticketNumber},
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

  rt_read(obj: any) {
    const body = {
      data: { ticketNumber: obj.ticketNumber }, // userId
    }

    console.log(obj);

    this.http.post<any>(environment.api + "support/read", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        //this.modalService.dismissAll();
        console.info("Approved");
        this.is_read = true;
        this.read_by = data.read_by;
      },
      error => {
        console.log(error);
      },

    );
  }

  rt_approved(obj: any) {
    const body = {
      data: { ticketNumber: obj.ticketNumber }, // userId
    }

    console.log(obj);

    this.http.post<any>(environment.api + "support/approved", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        //this.modalService.dismissAll();
        console.info("Approved");
        this.is_read = true;
      },
      error => {
        console.log(error);
      },

    );
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  back(){
    window.history.back();
  }

}
