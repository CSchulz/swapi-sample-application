export interface ListRecord<T> {
  /** api status */
  message: string;
  /** number of total records */
  total_records: number;
  /** number of total pages */
  total_pages: number;
  /** REST hypermedia link for previous result set */
  previous: string | null;
  /** REST hypermedia link for next result set */
  next: string | null;
  /** result list */
  results: Array<T>;
}

export interface SingleRecord<T> {
  /** api status */
  message: string;
  /** result entry */
  result: T;
}
