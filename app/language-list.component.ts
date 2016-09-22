import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Language } from './language';
import { LanguageService } from './language.service';

@Component({
    selector: 'language-list',
    templateUrl: 'app/language-list.component.html',
    styleUrls: [ 
        'assets/css/language-list.css', 
        'assets/css/table-responsibe.css' 
    ]
})
export class LanguageListComponent implements OnInit {
    languages: Language[] = [];
    constructor(
        private router: Router,
        private languageService: LanguageService
    ){ }
    ngOnInit(): void {
        this.languageService.getLanguages()
            .then(languages => this.languages = languages);
    }
    gotoDetail(language: Language): void {
        let link = ['/detail', language.id];
        this.router.navigate(link);
    }    
}
