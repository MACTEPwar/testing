import { TranslateService } from '@ngx-translate/core';
import { ConfigurationService } from './../../../core/configuration/configuration.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lang-check',
  templateUrl: './lang-check.component.html',
  styleUrls: ['./lang-check.component.scss'],
})
export class LangCheckComponent implements OnInit {
  languages;
  currentLanguage;

  constructor(
    private translateService: TranslateService,
    private configurationService: ConfigurationService
  ) {
    this.languages = this.configurationService.getValue('languages');
    this.currentLanguage = this.translateService.currentLang;
  }

  ngOnInit(): void {}

  changeLang(event: any): void {
    this.translateService.use(event.target.value);
  }
}
