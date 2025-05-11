
import { useDispatch, useSelector } from 'react-redux';
import React, {useEffect} from 'react'
import {userDetail, userOrder} from '../actions/userActions';
export default function UserProfile() {


    
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;
    // console.log(user)

    const userOrders = useSelector(state=>state.userOrders);
    const{orders} = userOrders;
    // console.log(orders)


    const dispatch = useDispatch();
    useEffect(() => {
        if(localStorage.getItem('token')){
            dispatch(userDetail());
            dispatch(userOrder());
        }
        // eslint-disable-next-line

    }, [dispatch]);

    const handleDate = (str)=>{
        let arr = Date(new Date(str)).split(' ');
        let date = `${arr[2]}-${arr[1]}-${arr[3]}`
        return date;
        
    }
    let pageStyle = {
        margin:'auto',
        width:'80%',
        fontSize:'larger'

    }
     
    return (
        <div style={{ marginTop: '100px' }}>
                {loading ? <div>Loading...</div> : 
                error ? <div> Error...</div> :
                (
                <div style={pageStyle}>
                <h2 className="mt-4 text-center">User Profile </h2>
                {user && 
                   <ul className="list-group">
                   <li className="list-group-item list-group-item-info">Name : {user.name}</li>
                   <li className="list-group-item list-group-item-primary">Email : {user.email}</li>
                   <li className="list-group-item list-group-item-danger">Role : {!user.isAdmin ? 'User' : 'Admin'}</li>
                   <li className="list-group-item list-group-item-success">Date Created : {handleDate(user.date)}</li>
               </ul>
                }
                <h2 className="mt-4 text-center">My Orders</h2>
                <ul className="list-group">
                {orders ?  orders.map((ele)=>{
                        return(     <div key={ele._id}>
                                    <li className="list-group-item list-group-item-info my-2">
                                    <p>OrderID : {ele._id}</p>
                                    <p>Bill : {ele.bill}</p>
                                    <p>Date : {handleDate(ele.date_added)}</p>
                                    <p>Items --------------- </p>
                                    {ele.items.map((p)=><div key={p.productId}>
                                        <p><b>Product Name</b> : {p.name}  <b>Price</b> : {p.price}  <b>Quantity</b> : {p.quantity} </p>
                                        
                                        </div>)}
                                    </li>
                                    </div>
                            )
                    }) : <div>No orders</div>}
                    </ul>
            
            </div>)
            }
                
            </div>
      
    )
}
        