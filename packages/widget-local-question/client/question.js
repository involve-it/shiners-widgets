/**
 * Created by c_aarutyunyan on 12/5/16.
 */
// import Materialize  from 'shiners:materialize';
import { FlowRouter } from 'meteor/kadira:flow-router';


$(document).ready(function () {
    //Materialize.toast('Держитесь крепко-грузим виджет!', 5000) // 4000 is the duration of the toast
});
Template.locquestionLocation.onRendered(function () {
    Materialize.updateTextFields();
});