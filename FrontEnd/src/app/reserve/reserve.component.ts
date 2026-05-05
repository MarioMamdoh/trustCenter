import { Component, inject } from '@angular/core';
import { AppService } from '../../../services/appService.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reserve',
  imports: [TranslateModule],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.scss',
  standalone: true,
})
export class ReserveComponent {
  appService = inject(AppService);
  IsThereFreeBed: boolean = false;
  isSelected: boolean = false;

  selectedArea: string = 'Giza';
  selected(event: any) {
    let area = event.target.value;
    this.selectedArea = area;
    this.appService.IsThereFreeBed(area).subscribe((data) => {
      this.isSelected = true;
      if (data.length !== 0) {
        this.IsThereFreeBed = true;
      } else {
        this.IsThereFreeBed = false;
      }
    });
  }
}
