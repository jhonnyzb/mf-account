import { DatePipe, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { getSession } from 'src/app/core/encryptData';
import { GTMSelectContent } from 'src/app/core/models/gtm-models/gtmSelectContent.model';
import { LoginValeproResponseModel } from 'src/app/core/models/response/loginValeproResponse.model';
import { Transaction } from 'src/app/core/models/response/pointsResponse.model';
import { AccountRepository } from 'src/app/core/repositories/account.respository';


@Component({
  selector: 'app-my-points',
  templateUrl: './my-points.component.html',
  styleUrls: ['./my-points.component.scss']
})
export class MyPointsComponent implements OnInit {
  user: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  isLoading = false;
  tabLoadTimes: Date[] = [];
  @ViewChild('tabGroup') tabGroup: any;

  transactions: Transaction[] = [];

  pointsAvaliable: number = 0;
  pointsAboutToExpire: number = 0;
  nextExpirationDate: string = '';

  totalElements: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  rangeInit: number = 0;
  rangeEnd: number = 0;
  currentPage: number = 1

  constructor(private acccountRepository: AccountRepository, private location: Location, private datePipe: DatePipe) { }



  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }
    return this.tabLoadTimes[index];
  }



  ngOnInit(): void {
    this.getPoints();
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
  }


  getPoints(): void {
    this.acccountRepository.getTransactionsPoints(this.currentPage, this.pageSize).subscribe({
      next: (resp) => {
        const { PointsAvaliable, PointsAboutToExpire, NextExpirationDate , Data, Pagination} = resp.data.MyPoints
        this.pointsAvaliable = PointsAvaliable;
        this.pointsAboutToExpire = PointsAboutToExpire;
        this.nextExpirationDate = NextExpirationDate;
        this.transactions = Data;
        this.totalElements = Pagination.TotalElements;
        this.totalPages = Pagination.TotalPages;
        this.getPaginate(Data.length);
      },
      error: (error) => {
        this.pointsAvaliable = 0;
        this.pointsAboutToExpire = 0;
        this.nextExpirationDate = '';
      }
    })
    this.isLoading = true;
  }

  onTabChange($event: MatTabChangeEvent) {
    if ($event.tab !== undefined) {
      this.sendGtmData($event);
    }
  }

  typeTransacctionText(typeTransacction: number): string {

    if (typeTransacction === 1) {
      return 'Misión';
    }
    else if (typeTransacction === 2) {
      return 'Carga de puntos';
    }
    else if (typeTransacction === 3) {
      return 'Redención';
    }
    else if (typeTransacction === 4) {
      return 'Novedad';
    }
    else if (typeTransacction === 5) {
      return 'Devolución de puntos';
    }
    else {
      return 'Novedad de puntos';
    }
  }

  getPaginate(itemsCurrentForPage: number){
    if (this.currentPage === 1) {
      this.rangeEnd = itemsCurrentForPage;
      this.rangeInit = this.currentPage;
    }else {
      this.rangeInit = ( this.currentPage * this.pageSize - 9 );
      this.rangeEnd = ( this.currentPage * this.pageSize - this.pageSize ) + itemsCurrentForPage;
    }
  }

  getLastPage(){
    if (this.totalPages !== 0 && this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.getPoints();   
    }
  }

  getFirstPage(){
    if (this.totalPages !== 0 && this.currentPage !== 1) {
      this.currentPage = 1;
      this.getPoints();   
    }
  }

  getNextPage(){
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.getPoints();
    }
  }

  getPreviousPage(){
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.getPoints();
    }
  }


  sendGtmData(event: MatTabChangeEvent) {
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Perfil",
      ParameterLocation: "Perfil - Mis Puntos",
      ParameterType: "filtro",
      ParameterCategory: "Perfil",
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterText: event.tab ? event.tab.textLabel : 'Sin información',
      ParameterItemID: "0",
      Currency: '',
      value: ''
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');
  }

  goBack(){
    this.location.back();
  }

  formatDate(date: string, isMobile: boolean){
    if (isMobile) {
      return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm');
    }
    return this.datePipe.transform(date, 'dd/MM/yyyy - HH:mm');
  }

}
