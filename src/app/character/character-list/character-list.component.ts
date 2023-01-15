import {AfterViewInit, Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {CharacterListDataSource} from './character-list-data-source';
import {CharacterListItem} from "../model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

const QUERY_PARAM_PAGE = 'page';
const QUERY_PARAM_ORDER_BY = 'orderBy';
const QUERY_PARAM_ORDER_DIR = 'orderDir';
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator)
  protected paginator!: MatPaginator;
  @ViewChild(MatSort)
  protected sort!: MatSort;
  @ViewChild(MatTable)
  protected table!: MatTable<CharacterListItem>;
  protected dataSource: CharacterListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  protected displayedColumns = ['name'];

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private subscriptions: Subscription[] = [];

  constructor() {
    this.dataSource = new CharacterListDataSource();
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    // TODO if needed reset wrong query params
    // TODO could be extracted as own class or directive
    // workaround for https://github.com/angular/components/issues/8417
    setTimeout(() => {
      if (this.route.snapshot.queryParams[QUERY_PARAM_PAGE]) {
        // parse as number and remove the logical number increment
        const pageIndex = (+this.route.snapshot.queryParams[QUERY_PARAM_PAGE] - 1)
        this.paginator.pageIndex = pageIndex >= 0 ? pageIndex : 0;
      }
      if (this.route.snapshot.queryParams[QUERY_PARAM_ORDER_BY] || this.route.snapshot.queryParams[QUERY_PARAM_ORDER_DIR]) {
        const orderBy = this.route.snapshot.queryParams[QUERY_PARAM_ORDER_BY];
        const orderDir = this.route.snapshot.queryParams[QUERY_PARAM_ORDER_DIR];
        this.sort.sort({
          id: this.displayedColumns.includes(orderBy) ? orderBy : 'name',
          start: orderDir === 'asc' || orderDir === 'desc' ? orderDir : 'asc',
          disableClear: false,
        })
      } else {
        this.sort.sort({
          id: 'name',
          start: 'asc',
          disableClear: false,
        })
      }
    });

    this.subscriptions.push(
      this.dataSource.paginator.page.subscribe((event) => {
        this.router.navigate(['.'], {
          queryParamsHandling: "merge",
          queryParams: {
            // it should be a logical number for non-programmer
            [QUERY_PARAM_PAGE]: event.pageIndex + 1,
          },
          relativeTo: this.route,
        })
      }),
    this.dataSource.sort.sortChange.subscribe((event) => {
      this.router.navigate(['.'], {
        queryParamsHandling: "merge",
        queryParams: {
          orderDir: event.direction,
          orderBy: event.active,
        },
        relativeTo: this.route,
      })
    })
    )
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
