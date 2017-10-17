import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const cellEditProp = {
  mode: 'click',
  blurToSave: true
};

class CsvTable extends React.Component {
  render() {
    const { table } = this.props;
    let csvData = [];
    let csvTitle = [];
    table.csvData.map((i, index) => {
      if (i.id === table.selectTab) {
        csvData = i.data.content;
        csvTitle = i.data.title;
      }
    })
    return (
      <BootstrapTable data={csvData} cellEdit={cellEditProp} exportCSV={true} csvFileName={`${table.selectTab}.csv`}>
        {
          csvTitle.map((i, index) => {
            return (
              <TableHeaderColumn key={i} dataField={i} isKey={i === "ID"}>{i}</TableHeaderColumn>
            )
          })
        }
      </BootstrapTable>
    );
  }
}

export default CsvTable;
