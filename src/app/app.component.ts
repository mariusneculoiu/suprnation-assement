import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SectionAComponent } from '../section-a/section-a.component';
import { SectionBComponent } from '../section-b/section-b.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, SectionAComponent, SectionBComponent, RouterLink ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'suprnation-test';

  public ngOnInit() {

  }


}
