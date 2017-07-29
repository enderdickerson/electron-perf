import { Injectable } from '@angular/core';
import { ConnectionService } from './connection.service';

@Injectable()

export class ResultStore {
  constructor(private db: ConnectionService) {}

  get() {
    const Report = this.db.mongoose.model('Report');

    const query = Report.find({});

    return query.exec((err, results) => {
      return results;
    });
  }
}
