import { Component } from '@angular/core';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageAwareComponent } from '../../base/language-aware.component';

@Component({
  selector: 'app-why-us',
  imports: [SectionHeadingComponent, TranslateModule],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss',
  standalone: true,
})
export class WhyUsComponent extends LanguageAwareComponent {
  protected onLanguageChange(language: string): void {

  }
}
