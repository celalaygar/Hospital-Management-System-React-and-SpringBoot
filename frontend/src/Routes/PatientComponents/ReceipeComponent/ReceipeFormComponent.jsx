import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import ReceipeService from "../../../services/ReceipeService";
import AlertifyService from '../../../services/AlertifyService';
export default class ReceipeFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: '',
            drug_detail: '', 
            barcode: '', 
            delivery_date: new Date(),
            patientid: window.localStorage.getItem('patientId'),
            problemid: window.localStorage.getItem('problemId')
        }
        this.saveReceipe  = this.saveReceipe.bind(this);
    }

    onChangeData (type, data) {
        const stateData = this.state;
        stateData[type] = data;
        this.setState({  stateData });
    }
    viewProblem(problemid) {
        //window.localStorage.setItem("problemid", id);
        this.props.history.push('/problem/' + problemid);
    }
    saveReceipe = (e) => {
        let data = this.state;
        console.log(data)
        ReceipeService.save(data).then(res => {
            data = res.data;
            if(data.receipeid>0){
                AlertifyService.successMessage("Saving receipe for related problem is ok.. ");
                data=null;
                this.setState({            detail: '',
                drug_detail: '', 
                barcode: '', 
                delivery_date: new Date(),
                patientid: window.localStorage.getItem('patientId'),
                problemid: window.localStorage.getItem('problemId')});
            }
            else{
                AlertifyService.errorMessage("Saving receipe for related problem is not ok.. ");
            }
        });
    }
    render() {
        let {detail, drug_detail, barcode, delivery_date} = this.state;
        const isWeekday = date => {
            const day = date.getDay(date);
            return day !== 0 && day !== 6;
        };
        return (
            <div className="row">
                <div className="col-sm-12">
                    <button
                        className="btn btn-danger "
                        onClick={() => this.viewProblem(this.state.problemid)}>Back</button>
                    <hr />
                </div>
                <div className="col-sm-9">
                    <h2 className="text-center">ADD RECEIPE</h2>
                    <hr />
                    <form>
                        <div className="form-group">
                            <label >Detail:</label>
                            <input 
                                type="text" 
                                placeholder="detail" 
                                name="detail" 
                                className="form-control" 
                                value={detail} onChange={e => this.onChangeData('detail', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label >Drug Detail:</label>
                            <input 
                                type="text" 
                                placeholder="drug_detail" 
                                name="drug_detail" 
                                className="form-control" 
                                value={drug_detail} onChange={e => this.onChangeData('drug_detail', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label >Drug Detail:</label>
                            <input 
                                type="text" 
                                placeholder="barcode" 
                                name="barcode" 
                                className="form-control" 
                                value={barcode} onChange={e => this.onChangeData('barcode', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Delivery Date:</label>
                                <div className="form-group">
                                    <DatePicker
                                        className="form-control"
                                        // showTimeSelect
                                        showTimeInput
                                        selected={delivery_date}
                                        onChange={e => this.onChangeData('delivery_date', e)}
                                        filterDate={isWeekday}          // disable weekend
                                        timeIntervals={15}              // time range around 15 min
                                        //showWeekNumbers               // show week number
                                        timeFormat="HH:mm"              // show time format
                                        dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                    />
                                </div>
                        </div>
                        <button className="btn btn-success" type="button"  onClick={this.saveReceipe} >Add</button>
                    </form>
                    <hr/>
                </div>
                <div className="col-lg-3">
                        <img style={{  height: 200 }} src="https://i1.wp.com/www.nosinmiubuntu.com/wp-content/uploads/2013/02/New-Database.png?w=770" alt="" />
                </div>
            </div>
        )
    }
}
