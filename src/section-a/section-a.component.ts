import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-section-a',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './section-a.component.html',
  styleUrl: './section-a.component.scss'
})
export class SectionAComponent implements OnInit{
  public a: number = 0;
  public b: number = 0;
  public result: number = 0;
  public selectedExercise: string = 'sumSquares'; // Default exercise

  // Runs when the component is initialized
  public ngOnInit(): void {
    // test exercise 4
    console.log('######### Exercise 4 ############');
    console.log(this.sumMap(x => x * x, 1, 5));
    console.log(this.sumMap(x => x * x * x, 1, 5));
    console.log(this.sumMap(x => this.factorial(x), 1, 5));
    console.log('###############################');
    console.log('######### Exercise 5 ############');
    console.log('sumInt2', this.sumInt2(1,5));
    console.log('sumSquares2', this.sumSquares2(1,5));
    console.log('sumCubes2', this.sumCubes2(1,5));
    console.log('sumFactorial2', this.sumFactorial2(1,5));
    console.log('###############################');
    console.log('######### Exercise 10 ############');
    console.log(this.prodMap(x => x, 1, 5));
    console.log(this.prodMap(x => x * x, 1, 5));
    console.log(this.prodMap(x => x * x * x, 1, 5));
    console.log(this.prodMap(x => this.factorial(x), 1, 5));
    console.log('###############################');
    console.log('######### Exercise 11 ############');
    console.log('prodInt2', this.prodInt2(1,5));
    console.log('prodSquares2', this.prodSquares2(1,5));
    console.log('prodCubes2', this.prodCubes2(1,5));
    console.log('prodFactorial2', this.prodFactorial2(1,5));
    console.log('###############################');
    console.log('######### Exercise 12 ############');
    const sumInts = this.mapReduce(x => x, (a, b) => a + b, 0);
    console.log('mapReduce sumInts',sumInts(1,5));
    const prodInts = this.mapReduce(x => x, (a, b) => a * b, 1);
    console.log('mapReduce prodInts',prodInts(1,5));
    console.log('###############################');
    console.log('######### Exercise 13 ############');
    const sumInts2 = this.mapReduce2((a, b) => a + b, 0)((x) => x);
    console.log('mapReduce sumInts2',sumInts2(1,5));
    const prodInts2 = this.mapReduce2((a, b) => a * b, 1)((x) => x);
    console.log('mapReduce prodInts2',prodInts2(1,5));
    console.log('###############################');
    console.log('######### Exercise 14 ############');
    console.log('mapReduce sumMap2', this.sumMap2(1,5));
    console.log('mapReduce prodMap2',this.prodMap2(1,5));
    console.log('###############################');
  }

  // Called when the form is submitted
  public calculate(): void {
    switch (this.selectedExercise) {
      case 'sumSquares':
        this.result = this.sumSquares(this.a, this.b);  // Call sumSquares
        break;
      case 'subCubes':
        this.result = this.subCubes(this.a, this.b);    // Call subCubes
        break;
      case 'sumFactorials':
        this.result = this.subFactorials(this.a, this.b);  // Call sumFactorials
        break;
      case 'prodInts':
        this.result = this.prodInts(this.a, this.b);    // Call prodInts
        break;
      case 'prodSquares':
        this.result = this.prodSquares(this.a, this.b);  // Call prodSquares
        break;
      case 'prodCubes':
        this.result = this.prodCubes(this.a, this.b);   // Call prodCubes
        break;
      case 'prodFactorials':
        this.result = this.prodFactorials(this.a, this.b);  // Call prodFactorials
        break;
      default:
        this.result = 0;  // Default case, if no valid exercise is selected
        break;
    }
  }

  // Exercise 1 - Sum of Squares
  private sumSquares(a: number, b: number): number {
    return (a > b) ? 0 : (a * a) + this.sumSquares(a + 1, b);
  }

  // Exercise 2 - Sum of Cubes
  private subCubes(a: number, b: number): number {
    return (a > b) ? 0 : (a * a * a) + this.subCubes(a + 1, b);
  }

  // Exercise 3 - Sum of Factorials
  private subFactorials(a: number, b: number): number {
    return (a > b) ? 0 : this.factorial(a) + this.subFactorials(a + 1, b);
  }

  private factorial(n: number): number {
    return n === 0 ? 1 : n * this.factorial(n-1);
  }

  // Exercise 4
  private sumMap = (mapFn: (value: number) => number, a: number, b: number): number =>
    (a > b) ? 0 : mapFn(a) + this.sumMap(mapFn, a + 1, b);


  // Exercise 5
  sumInt2 = (a: number, b: number) => this.sumMap(x => x, a, b);
  sumSquares2 = (a: number, b: number) => this.sumMap(x => x * x, a, b);
  sumCubes2 = (a: number, b: number) => this.sumMap(x =>  x * x * x, a, b);
  sumFactorial2 =  (a: number, b: number) => this.sumMap(x => this.factorial(x), a, b);

  // Exercise 6
  private prodInts(a: number, b: number): number {
    return (a > b) ? 1 : a * this.prodInts(a + 1, b);
  }

  // Exercise 7
  private prodSquares(a: number, b: number): number {
    return (a > b) ? 1 : (a * a) * this.prodSquares(a + 1, b);
  }

  // // Exercise 8
  private prodCubes(a: number, b: number): number {
    return (a > b) ? 1 : (a * a * a) * this.prodCubes(a + 1, b);
  }

  // Exercise 9
  private prodFactorials(a: number, b: number): number {
    return (a > b) ? 1 : this.factorial(a) * this.prodFactorials(a + 1, b);
  }


  // Exercise 10
  private prodMap = (mapFn: (value: number) => number, a: number, b: number): number =>
    (a > b) ? 1 : mapFn(a) * this.prodMap(mapFn, a + 1, b);


  // Exercise 11
  prodInt2 = (a: number, b: number) => this.prodMap(x => x, a, b);
  prodSquares2 = (a: number, b: number) => this.prodMap(x => x * x, a, b);
  prodCubes2 = (a: number, b: number) => this.prodMap(x =>  x * x * x, a, b);
  prodFactorial2 =  (a: number, b: number) => this.prodMap(x => this.factorial(x), a, b);

  // Exercise 12
  private mapReduce: (
    mapFn: (value: number) => number,
    reduceFn: (first: number, second: number) => number,
    zero: number
  ) => (a: number, b: number) => number = (mapFn, reduceFn, zero) => (a, b) =>
    a > b ? zero :
    reduceFn(mapFn(a), this.mapReduce(mapFn, reduceFn, zero)(a + 1, b)); // Map and reduce recursively


  // Exercise 13
  private mapReduce2: (
    reduceFn: (first: number, second: number) => number,
    zero: number
  ) => (mapFn: (value: number) => number) => (a: number, b: number) => number =
    (reduceFn, zero) => (mapFn) => (a, b) =>
      (a > b ? zero : reduceFn(mapFn(a),
        this.mapReduce2(reduceFn, zero)(mapFn)(a + 1, b)));

  // Exercise 14
  private sumMap2 = this.mapReduce2((a: number, b: number) => a + b, 0)((x: number) => x);

  private prodMap2 = this.mapReduce2((a: number, b: number) => a * b, 1)((x: number) => x);


}
