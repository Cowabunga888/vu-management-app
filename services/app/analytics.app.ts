import {callAPI} from "../callAPI";
import {ANALYTICS_ENDPOINT} from "../../src/config/endpoint.constant";

export const getListDataAnalyticsByMetric = () => {
  console.log('call api')
  return callAPI(ANALYTICS_ENDPOINT.GET_LIST_OF_METRICS_DATA, "GET", null)
}