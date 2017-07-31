export class Test {
  constructor(
    public url: string,
    public runs: number,
    public isAngular?: boolean,
    public id?: number
  ) {
    this.runs = this.runs || 3;
    this.isAngular = this.isAngular !== undefined ? this.isAngular : true;
  }
}
