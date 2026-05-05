import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-shell',
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class DashboardShellComponent {
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  title = 'DashBoard-Admin';
}
