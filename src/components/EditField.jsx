import React from 'react';

function EditField(props) {
  function saveChandes() {
    props.setVisible(true);
  }
  return (
    <div>
      <input></input>
      <button onClick={saveChandes}>Save Changes</button>
      <button>Cancel</button>
    </div>
  );
}
export default EditField;
