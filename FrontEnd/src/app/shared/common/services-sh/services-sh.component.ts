import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { AppService } from '../../../../../services/appService.service';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageAwareComponent } from '../../base/language-aware.component';

@Component({
  selector: 'app-services-sh',
  imports: [SectionHeadingComponent, TranslateModule],
  templateUrl: './services-sh.component.html',
  styleUrl: './services-sh.component.scss',
  standalone: true,
})
export class ServicesShComponent
  extends LanguageAwareComponent
  implements OnInit, OnDestroy
{
  appService = inject(AppService);
  serviceData = [];
  private dataSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.loadServices();
  }

  protected onLanguageChange(language: string): void {
    this.loadServices();
  }

  private loadServices(): void {
    const language = this.getCurrentLanguage();

    // Unsubscribe from previous data subscription only if it exists
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    this.dataSubscription = new Subscription();

    this.dataSubscription.add(
      this.appService.getAllServices(language).subscribe((val) => {
        this.serviceData = val;
      })
    );
  }

  override ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
