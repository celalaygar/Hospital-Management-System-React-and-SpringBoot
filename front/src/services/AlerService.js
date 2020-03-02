import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
import "@material/react-checkbox/dist/checkbox.css";
 
class AlertService {

    // confirm(message) {
    //     alertify.alert(message, function () {
    //         alertify.error('OK');
    //     });
    //     return true;
    // }

    alert(message) {
        //window.location.href = '/patients';
        //this.props.history.push('/patients' );
        alertify.alert(message, function () {
            alertify.error('OK');
        }); //.set({ title: "Attention" }).set({ transition: 'slide' }).show();
        return true;
    }

}

export default new AlertService();