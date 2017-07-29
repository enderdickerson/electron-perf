export class Test {
  constructor(
    public url: string,
    public runs: number,
    public isAngular?: boolean,
    public id?: number
  ) {
    this.runs = 3;
    this.isAngular = true;
  }
}
