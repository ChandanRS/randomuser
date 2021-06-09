import React, { useEffect, useState } from 'react';
import axios from 'axios'
import '../App.css';

const Card = () => {
     const [person, setPerson] = useState()
     const [title, setTitle] = useState("")
     const [val, setVal] = useState("")
     const [active, setActive] = useState("")
     const [user,setUser] = useState(1)
    useEffect(() => {
        const fetchData = async ()=> {
            const res = await axios.get('https://randomuser.me/api')
            setPerson(res.data.results[0])
            setActive('username')
            setTitle("Hi, My Name Is")
            setVal(`${res.data.results[0].name.first} ${res.data.results[0].name.last}`)
            // console.log(person)
        }
        fetchData()
    }, [user])

    console.log(person && person.name.first)

    const hoverHandler = ( item ) => {
        switch (item) {
            case 'username':
                setTitle("Hi, My Name Is");
                setVal(`${person.name.first} ${person.name.last}`)
                setActive('username')
                break;
            case 'mail':
                setTitle("Email Id")
                setVal(person.email)
                setActive('mail')

                break;
            case 'dob':
                setTitle("Date Of Birth")
                setVal(person.dob.date.substring(0,10))
                setActive('dob')

                break;
            case 'address':
                setTitle("Address")
                setVal(`${person.location.country}, ${person.location.city}`)
                setActive('address')

                break;
            case 'phone':
                setTitle("Phone Number")
                setVal(person.cell)
                setActive('phone')

                break;
            case 'passowrd':
                setTitle("Password")
                setVal(person.login.password)
                setActive('passowrd')
            break;
            default:
                break;
        }
    }
    return (
        <>
        {person &&  
        <div className="card">
         <span><img className="profile-pic" src={person.picture.large} alt="" /></span>
         <span className="title">{title}</span>
         <span className="value">{val}</span>
         { 
         <span className="details">
         <span className={active === 'username' ? "active" : "inactive"} onMouseOver={()=>hoverHandler('username')}><i class="far fa-2x fa-user"></i></span>
          <span className={active === 'mail' ? "active" : "inactive"} onMouseOver={()=>hoverHandler('mail')}><i class="far fa-2x fa-envelope"></i></span>
          <span className={active === 'dob' ? "active" : "inactive"} onMouseOver={()=>hoverHandler('dob')}><i class="fas fa-2x fa-calendar-day"></i></span>
          <span className={active === 'address' ? "active" : "inactive"} onMouseOver={()=>hoverHandler('address')}><i class="fas fa-2x fa-map-marked-alt"></i></span>
          <span className={active === 'phone' ? "active" : "inactive"} onMouseOver={()=>hoverHandler('phone')}><i class="fas fa-2x fa-phone-alt"></i></span>
          <span className={active === 'passowrd' ? "active" : "inactive"} onMouseOver={()=>hoverHandler('passowrd')}><i class="fas fa-2x fa-lock"></i></span>
         </span>
       }
        <button onClick={()=> setUser(user => user + Math.random()*10/10)}>Get Another User</button>
        </div>
        }
        </>
    );
};

export default Card;