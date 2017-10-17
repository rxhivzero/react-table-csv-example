export const GET_CSV = 'GET_CSV';
export const CHANGE_TAB = 'CHANGE_TAB';

export function getCsv(csvData , csvId) {
  return { type: GET_CSV, csvData: csvData , csvId:csvId};
}

export function changeTab(selectTab) {
  return { type: CHANGE_TAB, selectTab : selectTab};
}