import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { evaluate } from '@cloudmark/evaluator';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-section-c',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './section-c.component.html',
  styleUrl: './section-c.component.scss'
})
export class SectionCComponent {
  // expression = evaluate("1+2+sin(24+cos(23))")
}

