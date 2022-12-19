import {Component} from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import './app.css';

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            data: [
                {name: "Alex L.", salary: 1000, increace: false, id: 1},
                {name: "Ann L.", salary: 500, increace: true, id: 2},
                {name: "Vlad Sh.", salary: 5000, increace: false, id: 3},
            ],

        }
        this.maxIndex = 4
    }

    addItem = (name, salary) => {
        const newItem = {
            name: name,
            salary: salary,
            increace: false,
            id: this.maxIndex++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr,
            }
        })
    }

    dleteItem = (id) => {
        this.setState(({data}) => {
            // Удаление данных из массива в state
            // способ 1
            // const index = data.findIndex(elem => elem.id === id)
            // const before = data.slice(0,index);
            // const after = data.slice(index+1);
            // const newArr = [...before,...after]
            // return{
            //     data:newArr
            // }

            // Способ 2
            console.log('111')
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    onToggleIncrease = (id)=>{
        console.log(`Increase this ${id}`)
    }

    onToggleRise = (id)=>{
        console.log(`Rise this ${id}`)
    }

    render() {
        return (
            <div className='app'>
                <AppInfo/>

                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>

                <EmployeesList
                    data={this.state.data}
                    onDelete={this.dleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise = {this.onToggleRise}
                />

                <EmployeesAddForm
                    onAdd={this.addItem}
                />
            </div>
        );
    }
}

export default App;