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
    this.http.get<any>(environment.api + "billing/index?ref="+( (this.getId != "" || this.getId != undefined) ? this.getId.house : ''), {
      headers: this.configService.headers()
    }).subscribe(
      data => {
        this.labels = data['label'];
        this.items =  data['item'];
        for(let a = this.labels.length-1; a >= 0; a--){
           this.label_list.push(this.labels[a]);
           this.items_list.push(this.items[a]);
        } 
        console.log(this.label_list);
        console.log(this.items_list);
        /*this.items = this.items.filter((item: any) => {
           let result: any;
           result = item[0] != 'NO' && item[0] != '' &&  item[1] == this.getId.house;
           return result;
        });*/
      },
      error => {
        console.log(error);
      },

    );
  }

}
