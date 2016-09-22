import { NgModule }     from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';

import { AppComponent }   from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { CartographyComponent }   from './cartography.component';
import { LanguageListComponent }   from './language-list.component';
import { LanguageDetailComponent }   from './language-detail.component';
import { LanguageService }  from './language.service';
import { routing } from './app.routing';

@NgModule({
    imports: [ 
        BrowserModule,
        routing
    ],
    declarations: [ 
        AppComponent,
        DashboardComponent,
        CartographyComponent,
        LanguageListComponent,
        LanguageDetailComponent
    ],
    providers: [
        LanguageService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
