import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';

function UserCard(props) {
    let dataList = props.data
   
    return (
        dataList.map(data => {
            return (
                <tr key={data.id}>
                    <td>
                        <img className="LogoImg" src={'http://apis.chromeye.com:9191' + data.avatar.url} alt="logo"/>
                    </td>
                    <td>{data.id}</td>
                    <td>{data.firstName}</td>
                    <td>{data.lastName}</td>
                    <td>{data.email}</td>
                    <td>{data.company.name}</td>
                    <td>{data.company.department}</td>
                    <td>{data.company.startDate}</td>
                </tr>
                )
        })
    )
    
}


function App() {

    const [data, changeData] = useState([])
    const [unitsValue, setUnitsValue] = useState('3');
    const [[startIndex, endIndex], changeIndex] = useState([0, unitsValue])
    const [buttons, changButtons] = useState([])
    const [searchValue, setSearchValue] = useState('');
    

    function OnClick(e){

        if (e.target.nodeName === "BUTTON"){
            
            let allButtonEl = Array.from(document.querySelectorAll('button'))

            allButtonEl.filter(btn => {
                btn.style.backgroundColor = "white"
                btn.style.color = "black"
                return btn
            })

            e.target.style.backgroundColor = "#33b7fe"
            e.target.style.color = "white"
            let endIndex = !unitsValue.startsWith("A") ? Number(Number(e.target.id) + Number(unitsValue)) : data.length 
            changeIndex([Number(e.target.id), endIndex])
        }

    }

    function setValuesData(result, numOfUnits) {

        let allButtons = []

        if (numOfUnits.startsWith("A")){
            numOfUnits = result.length
        }

        let numOfButtons = Number((result.length / Number(numOfUnits)).toFixed())
        let idx = 0

        for (let i=0; i < numOfButtons; i++){
            allButtons.push(
                <button 
                    key={i} 
                    id={idx} 
                    style={{backgroundColor: i===0?"#33b7fe":"white", color: i===0?"white":"black"}}
                >{i+1}</button>
            )
            idx += Number(numOfUnits)
        }


        changeIndex([0, numOfUnits])
        changButtons([...allButtons])
        changeData([...result])
    }

    useEffect(() => {

        fetch(
            'http://apis.chromeye.com:9191/people', 
            {
                headers: {
                    'content-type': 'application/json'
                }
            }
        )
            .then(resp => resp.json())
            .then(result => {
                if (searchValue){
                    result = result.filter(obj => obj.firstName === searchValue || obj.lastName === searchValue)
                }
                
                setValuesData(result, unitsValue)
            })
            .catch(err => console.log(err.message)) 

    }, [searchValue, unitsValue])

    
    return (
        <div className="wraper" onClick={OnClick}>

            <div className='options'>

                <input 
                    type='text' 
                    className='search-bar' 
                    value={searchValue}
                    placeholder="Enter First or Last name..."
                    onChange={
                        (e) => setSearchValue(e.target.value)
                    }
                />

                {buttons}
                
                <label className="selectOpt-lable" htmlFor='selectOpt'>Users per page:</label>
                <select
                    className='selectOpt'
                    value={unitsValue}
                    onChange={
                        (e) => {
                            setUnitsValue(e.target.value)
                        }
                    }
                >
                    <option>1</option>
                    <option>3</option>
                    <option>5</option>
                    <option>All</option>
                </select>

            </div>

            <table>

                <thead className='tableHead'>
                    <tr>Avatar</tr>
                    <tr>Id</tr>
                    <tr>First Name</tr>
                    <tr>Last Name</tr>
                    <tr>Email</tr>
                    <tr>Company</tr>
                    <tr>Department</tr>
                    <tr>Start Date</tr>
                </thead>

                <tbody>
                    {data.length !== 0
                        ?<UserCard data={data.slice(startIndex, endIndex)}/>
                        :<tr><td>No data to show!!!</td></tr>
                    }
                </tbody>

            </table>
            
        </div>
    );
}

export default App;
