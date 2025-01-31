import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'homepage',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {}
