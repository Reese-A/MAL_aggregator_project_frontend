import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // for http
import { RouterModule } from '@angular/router'; // for routing
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { GroupComponent } from './pages/group/group.component';
import { LogoutComponent } from './components/logout/logout.component';

import { SearchService } from './services/search.service';
import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';
import { GroupService } from './services/group.service';
import { LogoutService } from './services/logout.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    GroupComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'login', component: LoginComponent },
        { path: 'group', component: GroupComponent},
        { path: '**', redirectTo: '', pathMatch: 'full' }
      ],
      { enableTracing: true }
    ),
  ],
  providers: [SearchService, RegisterService, LoginService, GroupService, LogoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
