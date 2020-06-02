import React from 'react';
import AdminForm from './AdminForm';

// Style
import style from './admin.module.scss';

// Utils
import {getClassName} from '../../utils/component-utils';

function AdminPage(props) {
  return (
    <div className={getClassName("container-fluid", style.AdminPage)}>
      <div className="row my-auto">
        <div className="col-md-3"></div>
        <div className="col-md-6">
            <AdminForm></AdminForm>
        </div>
        <div className="col-md-3">
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
