import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/service/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $ : any;

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  loading:boolean=true;
  items: any = [];
  labels: any = [];
  month_list: any = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  getId: any = JSON.parse(localStorage.getItem("forwardClient_obj"));
  items_list: any = [];
  label_list: any = [];

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getHttp();
  }


  getHttp() {
    this.http.get<any>(environment.api + "billing/index", {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.labels = data['label'];
        this.items =  data['item'];
        for(let a = this.labels.length-1; a >= 0; a--){ // untuk mengurut data dari yang tanggal terawal hingga terakhir
           this.label_list.push(this.labels[a]);
           this.items_list.push(this.items[a]);
        } 
        console.log(data); 
        this.loading=false;
      },
      error => {
        console.log(error);
      },

    );
  }

}
