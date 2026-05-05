import { Component } from '@angular/core';
import { ServicesShComponent } from '../shared/common/services-sh/services-sh.component';
import { SectionHeadingComponent } from '../shared/common/section-heading/section-heading.component';
import { WhyUsComponent } from '../shared/common/why-us/why-us.component';
import { AchievementComponent } from '../shared/common/achievement/achievement.component';
import { BlogComponent } from '../blogs/blog/blog.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-services',
  imports: [
    ServicesShComponent,
    SectionHeadingComponent,
    WhyUsComponent,
    AchievementComponent,
    BlogComponent,
    TranslateModule,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  standalone: true,
})
export class ServicesComponent {}
