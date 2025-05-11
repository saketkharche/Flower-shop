import React from 'react'

export default function NotFound() {

    let pageStyle = {
        marginBottom:'10rem',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',

    }
    return (
        <div style={{marginTop:'120px'}}>
            <div style={pageStyle}> 
            <h2 style={{color:'red'}}>Oops, This Page could not be found !!!</h2>
            </div>
            
        </div>
    )
}
