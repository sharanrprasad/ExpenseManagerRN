// @flow
import type {SummaryModel} from '../models/dtoModelTypes';
import {postHttpJson} from '../utils/httpRequests';
import EndPoint from '../EndPoint';

export function getSummaryData(startDate: Date, endDate : Date, userId : string): Promise<SummaryModel>  {
    return postHttpJson(EndPoint.GetSummaryUrl,{
      userId : userId,
      fromDate : startDate,
      toDate : endDate
    }).then(response => response.data);
}
