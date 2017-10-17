import React from 'react';
import { connect } from 'react-redux';
import { getCsv , changeTab } from '../redux/actions/table';
import CsvTable  from '../components/CsvTable';
import Tab from '../components/Tab';
import axios from 'axios';
import csvtojson from 'csvtojson';

class AppContainer extends React.Component {
  componentWillMount(){
    const { getCsv , table } = this.props;
    table.csvData.map((i, index) => {
      getCsv(i.id);
    })
  }
  render() {
    const { table } = this.props;
    return (
      <div>
        <Tab {...this.props}/>
        {(table.readCsv)? <CsvTable {...this.props}/> : undefined}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    table: state.table
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCsv: (csvId) => {
      let csvData = { title: [] , content : [] };
      let first = true;      
      axios.get(`/public/csv/${csvId}.csv`)
      .then(function (response) {
        const csvStr = response.data;
        csvtojson({ noheader: true })
          .fromString(csvStr)
          .on('csv', (csvRow) => {
            if(first){
              csvData.title = csvRow;
              first = false;
            }else{
              let newCsvRow = {};
              csvData.title.map((i, index) => {
                newCsvRow[i] = csvRow[index];
              })
              csvData.content.push(newCsvRow);
            }
          })
          .on('done', () => {
            dispatch(getCsv(csvData , csvId));
          })
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    changeTab: (selectTab) => {
      dispatch(changeTab(selectTab));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
