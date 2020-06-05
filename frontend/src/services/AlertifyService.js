import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
import "@material/react-checkbox/dist/checkbox.css";
 
class AlertifyService {

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
            alertify.error(message);
        }); //.set({ title: "Attention" }).set({ transition: 'slide' }).show();
        return true;
    }
    successMessage(message){
        alertify.success(message);
        return true;
    }
    errorMessage(message){
        alertify.error(message); 
        return true;
    }
}

export default new AlertifyService();