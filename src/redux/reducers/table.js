import { GET_CSV, CHANGE_TAB } from '../actions/table';

let initialState = { readCsv: false, selectTab: 'Attribute', csvData: [{ id: 'Attribute' }, { id: 'Dialogue' }] };



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CSV:
      let newData = state.csvData;
      newData.map((i, index) => {
        if (i.id === action.csvId) {
          newData[index].data = action.csvData;
          //Dialogue特別做判斷
          if(action.csvId === 'Dialogue'){
            newData[index].data.content.map((i, index) => {
              newData[0].data.content.map((n, y) => {
                if(i.Constraint.indexOf(n.ID) > -1){
                  i.Constraint = i.Constraint.replace(n.ID, n.Name);
                }
                if(i.Effect.indexOf(n.ID) > -1){
                  i.Effect = i.Effect.replace(n.ID, n.Name);
                }
              })
            })
          }
        }
      })

      return {
        ...state,
        readCsv: true,
        csvData: newData
      };
    case CHANGE_TAB:
      return {
        ...state,
        selectTab: action.selectTab
      };
    default:
      return state;
  }
}
