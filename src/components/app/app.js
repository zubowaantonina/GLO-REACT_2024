import { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployesList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";
import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "Jhon S.", salary: 800, increase: false, id: 1 },
        { name: "Alex W.", salary: 3000, increase: true, id: 2 },
        { name: "Carl L.", salary: 5000, increase: false, id: 3 },
      ],
    };
  }
  deleteItem = (id) => {
    this.setState(({ data }) => {
      // const index = data.findIndex(elem => elem.id === id);
      // const before = data.slice(0, index)
      // const after = data.slice(index + 1)
      // const newArr = [...before, ...after]
      // return {
      //   data: newArr
      // }


      return {
        data: data.filter(item => item.id !== id)
      }
    });
  };
  addItem = (name, salary) => {
    const newItem = {
      name: name,
      salary: salary,
      increase: false,
      like: false,
      id: uuidv4(),
    };

    this.setState(({ data }) => {
      return{
        data: [...data, newItem],
      }
    }
    
    );
  };


  render() {
    return (
      <div className="app">
        <AppInfo />
        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>
        <EmployesList data={this.state.data} onDelete={this.deleteItem} />
        <EmployersAddForm onAdd={this.addItem} />
      </div>
    );
  }
}
export default App;
