import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

import {RouterTestingModule} from '@angular/router/testing';
import {CharacterApiService} from '../character-api.service';
import {MockInstance, MockProvider, MockReset} from 'ng-mocks';
import {CharacterDetailComponent} from './character-detail.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {of} from 'rxjs';
import {PlanetListItem} from '../../planet/model';
import {MatCardModule, MatCardTitle} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {By} from "@angular/platform-browser";
import {mockCharacterDetailItem} from "../mocks";

const mockPlanetListResult: PlanetListItem[] = [
  {
    uid: '1',
    name: 'earth',
  }
]

describe(CharacterDetailComponent.name, () => {
  let component: CharacterDetailComponent;
  let fixture: ComponentFixture<CharacterDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterDetailComponent],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatCardModule,
        MatListModule,
        RouterTestingModule,
      ],
      providers: [
        MockProvider(CharacterApiService, {
          getItem: () => of(mockCharacterDetailItem),
        }),
        MockProvider(ActivatedRoute),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    MockInstance(
      ActivatedRoute,
      (instance) => {
        instance.params = of({
          uid: 1,
        });
        instance.snapshot = {
          data: {
            planets: mockPlanetListResult,
          }
        } as any;
      }
    );

    fixture = TestBed.createComponent(CharacterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => MockReset());

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should load a character', () => {
    expect(fixture.debugElement.query(By.directive(MatCardTitle)).nativeElement.innerHTML).toEqual(mockCharacterDetailItem.properties.name);
    expect(fixture.debugElement.query(By.directive(RouterLink)).nativeElement.innerHTML).toEqual(mockPlanetListResult[0].name);
  })
});
