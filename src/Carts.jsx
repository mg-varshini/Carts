import {useState} from 'react';
export  const Cart=()=>{
    const [user, setUser]=useState({name:"Ram Kumar",
                                    age:8,
                                    gender:"Male",
                                    isMarried:true,
                                    country:"India",
    });
function changeHandler(e){
    const name = e.target.name;
    const value=e.target.type==="checkbox"?e.target.checked:e.target.value;
    setUser({...user, [name] : value})
}

    return(<>
    <div className='table'>
    <table >
        <tbody>
            <tr>
                <td>Name</td>
                <td>{user.name}</td>
            </tr>
            <tr>
                <td>Age</td>
                <td>{user.age}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td>{user.gender}</td>
            </tr>
            <tr>
                <td>Marital Status</td>
                <td>{user.isMarried ? "Married" : "Not Married"}</td>
            </tr>
            <tr>
                <td>Country</td>
                <td>{user.country}</td>
            </tr>
            
        </tbody>
    </table>
    <form >
        <input name="name" type="text" onChange={changeHandler} placeholder='Name of the Member' value={user.name}/>
        <input name="age" type="text" placeholder='Age' value={user.age} onChange={changeHandler}/>
        <div className='gender'>
            <label htmlFor="male">
                <input type="radio" name="gender" value="Male" id="gender" onChange={changeHandler} checked={user.gender == "Male"}/>
                Male
            </label>
            <label htmlFor="female">
                <input type="radio" name="gender" value="Female" id="gender" onChange={changeHandler} checked={user.gender == "Female"}/>
                Female
            </label>
        </div>
        <label htmlFor="isMarried">
            <input type="checkbox" name="isMarried" onChange={changeHandler}/>
            Is Married</label>
        <div className="select">
        <label htmlFor="country">Select Country:</label>
        <select  name="country" id="country" value={user.country}  onChange={changeHandler}>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Asia">Asia</option>
            <option value="Kanada">Kanada</option>
        </select>
        </div>
    </form>
    </div>

    </>)
};