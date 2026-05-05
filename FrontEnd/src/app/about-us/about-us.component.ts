import { Component } from '@angular/core';
import { AchievementComponent } from '../shared/common/achievement/achievement.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us',
  imports: [AchievementComponent, TranslateModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  standalone: true,
})
export class AboutUsComponent {}
