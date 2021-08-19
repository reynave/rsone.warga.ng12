import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

declare var $: any;

/*export class Model {
  constructor(
    public id: number,
    public ticketNumber: string,
    public subject: string,
    public note: string,
    public supportStatusId: number,
    public supportFormId: number
  ) { } 
}*/

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
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

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }

  new_support() {
    this.router.navigate(['/support/form']);
  }

  getHttp() {
    this.http.get<any>(environment.api + "support/index/", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.items = data['items'];
        console.log(data);
      },
      error => {
        console.log(error);
      },
    );

    this.http.get<any>(environment.api + "support/getAccess/", {
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

  onCreateTicket(param: number) {

    const body = {
      data: { supportFormId: param, subject: "", note: "" }, // userId
    }

    console.log(body);

    this.http.post<any>(environment.api + "support/onSelectRequest", body, {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.modalService.dismissAll();
        this.router.navigate(['/support/'+data.items]);
        /*if (param == 1) {
          this.new_support();
        }
        else if (param == 2) { // Izin
          this.router.navigate(['/support/form/izin']);
        }
        else if (param == 4) { // Renovasi
          this.router.navigate(['/support/form/renovasi']);
        }*/
      },
      error => {
        console.log(error);
      },

    );
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
    this.new_tab = 'https://forwards.or.id/admin.api/formresidenceone/index/' + fro + '?ticket=' + (ticketNumber ? ticketNumber : '') + '&action=print';
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
