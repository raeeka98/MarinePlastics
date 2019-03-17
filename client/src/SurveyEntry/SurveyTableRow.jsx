import React from 'react';

const SurveyTableRow = props => {
  return (
    <tr >
      <td className={props.edit ? "editable" : null}>
        {props.edit ? <span className="minusBtn"></span> : null}
        {props.name}
      </td>
      <td>{props.fresh}</td>
      <td>{props.weathered}</td>
    </tr>
  );
}

export default SurveyTableRow;
