import React from 'react';

// Utils
import { getClassName } from '../../utils/component-utils';

// Style
import style from './userinfo.module.scss';

export default function DeleteAccountButton() {
    return (
        <div className="col text-center">
            <button type="button" id="DeleteBtn" className="btn btn-danger" onClick={alertDelete}>DELETE ACCOUNT</button>
            <div id="DeleteForm" className={style.CustomForm}>
                <div className={style.RemindFormContent}>
                    <div className={style.FormAlertHeader}>
                        <h3>
                            Alert
                        </h3>
                    </div>
                    <div className={style.BodyForm}>
                        <p>Do you want to delete your account?</p>
                    </div>
                    <button type="button" id="YesAlertBtn" className={getClassName("btn btn-danger",style.ButtonMargin)}>YES</button>
                    <button type="button" id="NoAlertBtn" className={getClassName("btn btn-danger",style.ButtonMargin)}>NO</button>
                </div>
            </div>
        </div>
    );
}

function alertDelete() {
    // Get the modal
    let modal = document.getElementById("DeleteForm");

    // Get the button that opens the modal
    let btn = document.getElementById("DeleteBtn");

    // Get the <span> element that closes the modal
    let noButton = document.getElementById("NoAlertBtn");

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
      modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    noButton.onclick = function () {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  }