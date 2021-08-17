import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
 
@Component({
  selector: 'app-support-detail',
  templateUrl: './support-detail.component.html',
  styleUrls: ['./support-detail.component.css']
})
export class SupportDetailComponent implements OnInit {
  navgatorTop : boolean = true;
  items: any = [];
  fwd_obj: any = JSON.parse(localStorage.getItem("forwardClient_obj")) || '{}';
  obj: any = [];
  showList: boolean = true;
  showDetail: boolean = false;
  showButton: boolean = true;
  id_user_access: number;
  new_tab: string;
  is_read: boolean = false;
  is_approved: boolean = false;
  action: any = [];
  read_by: string;
  ticket :string;
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
    this.id_user_access = this.fwd_obj.id_user_access;
  }

 
  getHttp(ticket) {
    console.log(environment.api + "support/detail/" +ticket);
    this.http.get<any>(environment.api + "support/detail/" +ticket, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.items = data['items'];
        this.obj = data['items'][0];
        console.log(data);
      },
      error => {
        console.log(error);
      },
    );

    this.http.get<any>(environment.api + "support/getAccess/" + ((this.fwd_obj != "" || this.fwd_obj != undefined) ? this.fwd_obj.name : ''), {
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

 

  rt_read(obj: any) {
    const body = {
      data: { ticketNumber: obj.ticketNumber, userId: obj.userId, read_by: this.fwd_obj.username }, // userId
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
      data: { ticketNumber: obj.ticketNumber, userId: obj.userId }, // userId
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

  show_detail(supportFormId: number, ticketNumber: string) {
    
    let fro = '';
    if (supportFormId == 2) { // izin
      fro = 'izin';
    }
    else if (supportFormId == 4) {
      fro = 'renov';
    }
    else if (supportFormId == 1) {
      fro = 'deposit';
    }
    this.new_tab =  environment.apiAdmin + fro + '?ticket=' + (ticketNumber ? ticketNumber : '') + '&action=print';
    this.showList = false;
    this.showDetail = true;
    this.showButton = false;
  }

  show_list() {
    this.showList = true;
    this.showDetail = false;
    this.showButton = true;
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
