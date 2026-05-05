import { Component, inject, OnInit } from '@angular/core';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { AppService } from '../../../../../services/appService.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-achievement',
  standalone: true,
  imports: [SectionHeadingComponent, TranslateModule],
  templateUrl: './achievement.component.html',
  styleUrl: './achievement.component.scss',
})
export class AchievementComponent implements OnInit {
  appService = inject(AppService);
  achievementData = [];

  ngOnInit(): void {
    this.appService.getAllAchievements().subscribe((val) => {
      this.achievementData = val;
    });
  }
}
