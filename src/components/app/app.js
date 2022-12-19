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
                {name: "Alex L.", salary: 1000, increase: false, rise: true, id: 1},
                {name: "Ann L.", salary: 500, increase: true, rise: false, id: 2},
                {name: "Vlad Sh.", salary: 5000, increase: false, rise: false, id: 3},
            ],

        }
        this.maxIndex = 4
    }

    addItem = (name, salary) => {
        const newItem = {
            name: name,
            salary: salary,
            increase: false,
            rise: false,
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

    onToggleProp = (id,prop) => {
        // Вариант 1, все понятно но много кода
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id)
        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase};
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
        //     return {
        //         data: newArr
        //     }
        // })

        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    // onToggleRise = (id) => {
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return {...item, rise: !item.rise}
    //             }
    //             return item;
    //         })
    //     }))
    // }

    render() {
        const employees = this.state.data.length
        const increased = this.state.data.filter(item => item.increase === true).length
        return (
            <div className='app'>
                <AppInfo
                    employees={employees}
                    increased={increased}/>

                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>

                <EmployeesList
                    data={this.state.data}
                    onDelete={this.dleteItem}
                    onToggleProp={this.onToggleProp}
                />

                <EmployeesAddForm
                    onAdd={this.addItem}
                />
            </div>
        );
    }
}

export default App;