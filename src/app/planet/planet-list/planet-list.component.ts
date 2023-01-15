import {AfterViewInit, Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {PlanetListDataSource} from './planet-list-data-source';
import {PlanetListItem} from "../model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

const QUERY_PARAM_PAGE = 'page';
const QUERY_PARAM_ORDER_BY = 'orderBy';
const QUERY_PARAM_ORDER_DIR = 'orderDir';
@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  @ViewChild(MatSort)
  public sort!: MatSort;
  @ViewChild(MatTable)
  public table!: MatTable<PlanetListItem>;
  public dataSource: PlanetListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns = ['name'];

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private subscriptions: Subscription[] = [];

  constructor() {
    this.dataSource = new PlanetListDataSource();
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    // TODO if needed reset wrong query params
    // TODO could be extracted as own class or directive
    if (this.route.snapshot.queryParams[QUERY_PARAM_PAGE]) {
      // parse as number and remove the logical number increment
      const pageIndex = (+this.route.snapshot.queryParams[QUERY_PARAM_PAGE]-1)
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
