import { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployesList from "../employees-list/employers-list";
import EmployersAddForm from "../employees-add-form/employees-add-form";
import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "Jhon S.", salary: 800, increase: false, rice: false, id: 1 },
        { name: "Alex W.", salary: 3000, increase: false, rice: true, id: 2 },
        { name: "Carl L.", salary: 5000, increase: false, rice: false, id: 3 },
      ],
      term:'',
      filter:'rice'
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
        data: data.filter((item) => item.id !== id),
      };
    });
  };
  addItem = (name, salary) => {
    const newItem = {
      name: name,
      salary: salary,
      increase: false,
      like: false,
      rice: false,
      id: uuidv4(),
    };

    this.setState(({ data }) => {
      return {
        data: [...data, newItem],
      };
    });
  };

  // onToggleIncrease = (id) => {
    // this.setState(({ data }) => {
    //   const index = data.findIndex((elem) => elem.id === id);
    //   const old = data[index];
    //   const newItem = { ...old, increase: !old.increase };
    //   const newArr = [
    //     ...data.slice(0, index),
    //     newItem,
    //     ...data.slice(index + 1),
    //   ];
    //   return {
    //     data: newArr,
    //   };
    // });
    // -------------------------------------------------------- вариант2
  //   this.setState(({ data }) => ({
  //     data: data.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, increase: !item.increase };
  //       }
  //       return item;
  //     }),
  //   }));
  // };
  // onToggleRice = (id) => {
  //   this.setState(({ data }) => ({
  //     data: data.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, rice: !item.rice };
  //       }
  //       return item;
  //     }),
  //   }));
  // };


// оптимизация 1 метод для 2 случаев ^

 onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

searchEmp=(items, term)=>{
if(term.lengch===0){
  return items;
}
return items.filter(item=>{
  return item.name.indexOf(term)>-1
})
}
onUpdateSearch=(term)=>{
  this.setState({term})
}
filterPost=(items, filter)=>{
  switch (filter) {
    case 'rice':
      return items.filter(item=>item.rice);
      case 'moreThen1000':
        return items.filter(item=>item.salary>1000);
    default:
      return items;
  }
}
onFilterSelect=(filter)=>{
this.setState({filter});
}


  render() {
    const { data, term,filter}=this.state;
    const employees=this.state.data.length;
    const inscreased=this.state.data.filter(item=>item.increase).length;
    const visibleData=this.filterPost(this.searchEmp(data, term), filter);
    return (
      <div className="app">
        <AppInfo employees={employees} inscreased={inscreased}/>
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
        </div>
        <EmployesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
          // onToggleRice={this.onToggleRice}
          // onToggleIncrease={this.onToggleIncrease}
        />
        <EmployersAddForm onAdd={this.addItem} />
      </div>
    );
  }
}
export default App;
