import React from 'react';

class CsvTable extends React.Component {
  render() {
    const { table } = this.props;
    const { selectTab, csvData } = table;
    return (
      <ul className="tabs nav nav-pills">
        {
          csvData.map((i, index) => {
            return (
              <li key={i.id} className={selectTab === i.id? 'active' : ''}><a onClick={()=>{this.props.changeTab(i.id)}}>{i.id}</a></li>
            );
          })
        }
      </ul>
    );
  }
}

export default CsvTable;
