import { Component, input, OnInit } from '@angular/core';
import { failure, Parser, Result, success, Token } from './types';
import { FormsModule } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { match } from 'node:assert';

@Component({
  selector: 'app-section-b',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    NgIf
  ],
  templateUrl: './section-b.component.html',
  styleUrl: './section-b.component.scss'
})
export class SectionBComponent implements OnInit{
  expression: string = '';
  result: Result | null = null;
  selectedParser: 'number' | 'operator' | 'openParenthesis' | 'closeParenthesis' = 'number';

  public ngOnInit(): void {
    console.log('########## Exercise 20 ########');
    console.log('choice', this.choice(this.parseNumber, this.parseOperator) ('1+2'));
    console.log('choice', this.choice(this.parseNumber, this.parseOperator) ('+2'));
    console.log('choice', this.choice(this.parseNumber, this.parseOperator) ('(+'));
    console.log('##################');
    console.log('########## Exercise 22 ########');
    console.log('choiceN', this.choiceN([this.parseNumber, this.parseOperator, this.parseOpenParenthesis]) ('1+2'));
    console.log('choiceN', this.choiceN([this.parseNumber, this.parseOperator, this.parseOpenParenthesis]) (')1 + 2('));
    console.log('##################');
    console.log('########## Exercise 23 ########');
    console.log('zip', this.zip(this.parseNumber, this.parseOperator) ('1+2'));
    console.log('zip', this.zip(this.parseNumber, this.parseOperator) ('1+2'));
    console.log('zip', this.zip(this.parseNumber, this.parseOperator) ('1+2+3'));
    console.log('##################');

  }


  public parseNumber: Parser = (input: string) => {
    const match = /^\d+/.exec(input);
    if (match) {
      return success(
        [{ type: "NUMBER", value: match[0] }],
        input.slice(match[0].length)
      );
    }
    return failure("Not a number");
  }

  // Exercise 15
  public parseOperator: Parser = (input: string) => {
    const match = /^[+\-]/.exec(input);
    if (match) {
      return success(
        [{ type: "OPERATOR", value: match[0] }],
        input.slice(match[0].length)
      );
    }
    return failure("Expected '+' or '-'");
  }

  // Exercise 16
  public parseOpenParenthesis: Parser = (input: string) => {
    const match = /^[(]/.exec(input);
    if (match) {
      return success(
        [{ type: "OPEN_PARENTHESIS", value: match[0] }],
        input.slice(match[0].length)
      );
    }
    return failure("Expected '('");
  }


  // Exercise 17
  public parseCloseParenthesis: Parser = (input: string) => {
    const match = /^[)]/.exec(input);
    if (match) {
      return success(
        [{ type: "CLOSE_PARENTHESIS", value: match[0] }],
        input.slice(match[0].length)
      );
    }
    return failure("Expected ')'");
  }

  // Exercise 18
  private parseCharacter: (char: string, tokenType: Token['type']) => Parser = (char, tokenType) => {
    return (input: string): Result => {
      const match = new RegExp(`^${char}`).exec(input); // Create a regex to match the character
      if (match) {
        return success(
          [{ type: tokenType, value: match[0] }],
          input.slice(match[0].length) // Return the rest of the input
        );
      }
      return failure(`Expected '${char}'`); // Return failure if character is not found
    };
  };

  // Exercise 19
  public parseOpenParenthesis2: Parser = this.parseCharacter('(', 'OPEN_PARENTHESIS');
  public parseCloseParenthesis2: Parser = this.parseCharacter(')', 'CLOSE_PARENTHESIS');

  // Exercise 20
  private choice: (p1: Parser, p2: Parser) => Parser = (p1, p2) => {
    return (input: string): Result => {
      const result = p1(input);
      if (result.success) {
        return result;
      }
      return p2(input);
    };
  };

  // Exercise 21

  // Exercise 22
  private choiceN: (parsers: Parser[]) => Parser = (parsers) => {
    return (input: string): Result => {
      for (const parser of parsers) {
        const result = parser(input);
        if (result.success) {
          return result;
        }
      }
      return failure("Choice parser: All choices failed on input");
    };
  };


  public zip: (parser1: Parser, parser2: Parser) => Parser = (parser1, parser2) => {
    return (input: string): Result => {
      const result1 = parser1(input);
      if (!result1.success) return result1;

      const result2 = parser2(result1.rest);
      if (!result2.success) return result2;

      return success(
        [...result1.value, ...result2.value],
        result2.rest
      );
    };
  };



  public tokenize() {
    switch (this.selectedParser) {
      case 'number':
        this.result = this.parseNumber(this.expression);
        break;
      case 'operator':
        this.result = this.parseOperator(this.expression);
        break;
      case 'openParenthesis':
        this.result = this.parseOpenParenthesis(this.expression);
        break;
      case 'closeParenthesis':
        this.result = this.parseCloseParenthesis(this.expression);
        break;
      default:
        this.result = failure("Unknown parser type");
        break;
    }
  }


}
