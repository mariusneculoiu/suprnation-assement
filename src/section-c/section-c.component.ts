import { Component } from '@angular/core';
import { JsonPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { evaluate } from '@alansuprnation/evaluator';  // Assuming you're using this evaluation library
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-section-c',
  standalone: true,
  imports: [ JsonPipe, FormsModule, NgIf, NgForOf, ReactiveFormsModule, NgClass ],
  templateUrl: './section-c.component.html',
  styleUrls: ['./section-c.component.scss']
})
export class SectionCComponent {
  expressionForm: FormGroup;
  result: any = null;
  errorMessage: string | null = null;
  history: Array<{ expression: string, result: any }> = [];
  submitAttempted: boolean = false;

  constructor(private fb: FormBuilder) {
    this.expressionForm = this.fb.group({
      expressionInput: ['', [Validators.required, this.expressionValidator]]
    });
  }

  public evaluateExpression(): void {
    this.submitAttempted = true;
    const expression = this.expressionForm.get('expressionInput')?.value;

    try {
      this.result = evaluate(expression);

      this.addToHistory(expression, this.result);
      this.errorMessage = null;
    } catch (error) {
      this.result = null;
      this.errorMessage = 'Invalid expression!';
    }
  }

  public addToHistory(expression: string, result: any): void {
    if (this.history.length === 5) {
      this.history.shift();
    }
    this.history.push({ expression, result });
  }

  private expressionValidator(control: any) {
    const expressionPattern = /^[0-9+\-*/().=\s]+$/;  // Simple regex for basic math expressions
    if (!expressionPattern.test(control.value)) {
      return { invalidExpression: true };
    }
    return null;
  }
}
