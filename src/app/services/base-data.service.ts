import { BehaviorSubject, Subject } from 'rxjs';

export abstract class BaseDataService<TData> {
  public loaded$ = new BehaviorSubject<boolean>(false);
  public loading$ = new BehaviorSubject<boolean>(false);
  public entities$ = new BehaviorSubject<Array<TData>>([]);

  public destroy$ = new Subject<void>();
}
