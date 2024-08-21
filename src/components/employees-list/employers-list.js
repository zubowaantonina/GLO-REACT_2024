import EmployersListItem from "../employees-list-item/employers-list-item";
import './employers-list.css'

const EmployersList = ({data, onDelete, onToggleIncrease, onToggleRice, onToggleProp}) => {

const elements=data.map(item=>{
  const {id,...itemProps}=item
    return (

        <EmployersListItem
         key={id}
          {...itemProps}
          onDelete={()=>onDelete(id)}
          onToggleProp={(e)=>onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
        //   onToggleIncrease={()=>onToggleIncrease(id)}
        //   onToggleRice={()=>onToggleRice(id)}
          />  
    )
})

    return (
        <ul className="app-list list-group">
           {elements}
        </ul>
    );
};
export default EmployersList;
