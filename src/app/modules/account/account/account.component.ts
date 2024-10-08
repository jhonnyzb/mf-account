import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  titlePage: any;

  contentMenuProfileClass = 'content';

  constructor(private router: Router,private titleService:Title,
    private activatedRoute: ActivatedRoute, private location: Location ) {
     this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      ).subscribe(() => {
        const rt = this.getChild(this.activatedRoute);
        this.titlePage = rt.data._value.title
        sessionStorage.setItem('title', this.titlePage);
        if(this.titlePage == 'Mis puntos'){
          this.titlePage = `Mis "poner tipo de punto aqui"`;
        }
        this.titleService.setTitle(this.titlePage)

      });

      this.titlePage = !this.titlePage && sessionStorage.getItem('title')? sessionStorage.getItem('title'): this.titlePage;
   }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }

  }

  checkUrl(){
    return this.router.url == '/main/account/points';
  }

  goBack(){
    this.location.back();
  }
}
