import { Component, inject, OnInit } from '@angular/core';
import {
  AchievementService,
  AchievementType,
} from '../../services/achievement.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-achievement',
  imports: [FormsModule, NgIf],
  templateUrl: './achievement.component.html',
  styleUrl: './achievement.component.scss',
})
export class AchievementComponent implements OnInit {
  achievementService = inject(AchievementService);
  servedValue!: number;
  teamValue!: number;
  experienceValue!: number;
  ambulanceValue!: number;
  _sValue!: number;
  _tValue!: number;
  _eValue!: number;
  _aValue!: number;
  activeCard: string | null = null;

  ngOnInit(): void {
    this.achievementService.getAll().subscribe((data) => {
      data.forEach((element: any) => {
        if (element.type === 'served') {
          this.servedValue = element.count;
          this._sValue = element.count;
        } else if (element.type === 'ambulance') {
          this.ambulanceValue = element.count;
          this._aValue = element.count;
        } else if (element.type === 'experience') {
          this.experienceValue = element.count;
          this._eValue = element.count;
        } else if (element.type === 'team') {
          this.teamValue = element.count;
          this._tValue = element.count;
        }
      });
    });
  }

  incrementValue(event: any) {
    const input = event.target.parentNode.parentNode.childNodes[1];
    const type = input.getAttribute('aria-details');
    this.activeCard = type;

    switch (type) {
      case 'served':
        this._sValue++;
        break;
      case 'team':
        this._tValue++;
        break;
      case 'experience':
        this._eValue++;
        break;
      case 'ambulance':
        this._aValue++;
        break;
    }
  }

  decrementValue(event: any) {
    const input = event.target.parentNode.parentNode.childNodes[1];
    const type = input.getAttribute('aria-details');
    this.activeCard = type;

    switch (type) {
      case 'served':
        if (this._sValue > 0) this._sValue--;
        break;
      case 'team':
        if (this._tValue > 0) this._tValue--;
        break;
      case 'experience':
        if (this._eValue > 0) this._eValue--;
        break;
      case 'ambulance':
        if (this._aValue > 0) this._aValue--;
        break;
    }
  }

  onSubmit(event: any) {
    const type = event.target.parentNode.getAttribute('aria-details');

    switch (type) {
      case 'served':
        this.achievementService
          .update(AchievementType.SERVED, this._sValue)
          .subscribe(() => {
            this.servedValue = this._sValue;
            this.activeCard = null;
          });
        break;
      case 'team':
        this.achievementService
          .update(AchievementType.TEAM, this._tValue)
          .subscribe(() => {
            this.teamValue = this._tValue;
            this.activeCard = null;
          });
        break;
      case 'experience':
        this.achievementService
          .update(AchievementType.EXPERIENCE, this._eValue)
          .subscribe(() => {
            this.experienceValue = this._eValue;
            this.activeCard = null;
          });
        break;
      case 'ambulance':
        this.achievementService
          .update(AchievementType.AMBULANCE, this._aValue)
          .subscribe(() => {
            this.ambulanceValue = this._aValue;
            this.activeCard = null;
          });
        break;
    }
  }

  onClose(event: any) {
    const type = event.target.parentNode.getAttribute('aria-details');

    switch (type) {
      case 'served':
        this._sValue = this.servedValue;
        break;
      case 'team':
        this._tValue = this.teamValue;
        break;
      case 'experience':
        this._eValue = this.experienceValue;
        break;
      case 'ambulance':
        this._aValue = this.ambulanceValue;
        break;
    }
    this.activeCard = null;
  }

  onInputChange(event: any) {
    const type = event.target.getAttribute('aria-details');
    this.activeCard = type;
  }
}
