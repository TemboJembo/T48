import { Component } from '@angular/core';
import { NavbarComponent } from './layout/navbar/navbar.component'; // Import NavbarComponent
import { RouterModule } from '@angular/router';  // Import RouterModule

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,  // Mark as a standalone component
  imports: [NavbarComponent, RouterModule], // Add RouterModule to imports
})
export class AppComponent {
  title = 'T48 Application';
}