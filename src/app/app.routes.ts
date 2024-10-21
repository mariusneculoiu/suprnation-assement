import { Routes } from '@angular/router';
import { SectionAComponent } from '../section-a/section-a.component';
import { SectionBComponent } from '../section-b/section-b.component';
import { SectionCComponent } from '../section-c/section-c.component';

export const routes: Routes = [
  { path: 'sectionA', component: SectionAComponent },
  { path: 'sectionB', component: SectionBComponent },
  { path: 'sectionC', component: SectionCComponent },
  { path: '', redirectTo: '/sectionA', pathMatch: 'full' }
];
