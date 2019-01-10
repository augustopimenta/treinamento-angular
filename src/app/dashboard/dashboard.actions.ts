import { Action } from '@ngrx/store';

export enum DashboardActionTypes {
  LoadDashboards = '[Dashboard] Load Dashboards'
}

export class LoadDashboards implements Action {
  readonly type = DashboardActionTypes.LoadDashboards;
}

export type DashboardActions = LoadDashboards;
