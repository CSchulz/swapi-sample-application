import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {CharacterDetailItem} from '../model';

@Component({
  selector: 'app-character-detail',
  styleUrls: ['./character-detail.component.scss'],
  templateUrl: 'character-detail.component.html'
})
export class CharacterDetailComponent {
  public character$: Observable<CharacterDetailItem>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.character$ = this.route.params.pipe(switchMap(params => {
      // TODO
      return of({
        uid: params['uid'],
        name: 'Test',
      } as any)
    }));
  }
}
