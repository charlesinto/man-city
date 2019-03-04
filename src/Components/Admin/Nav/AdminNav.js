import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '@material-ui/core';
import { firebase } from '../../../Firebase'

const AdminNav = () => {
    return (
        <div>
            {renderItems()}
            <ListItem 
                button style={styles} onClick={() => logOutHandler()}
            >
                Log Out
            </ListItem>
        </div>
    );
};

const logOutHandler = () => {
    firebase.auth().signOut()
        .then(() => {
            console.log('loggged out')
        }, (error) => {
            console.log('something went wrong')
        })
}

const links = [
    {
        title:'Matches',
        linkTo: '/matches'
    },
    {
        title:'Add Matches',
        linkTo: '/matches/edit_match'
    },
    {
        title:'Player',
        linkTo: '/players/'
    },
    {
        title:'Add Players',
        linkTo: '/players/add_player'
    }
]

const styles = {
    color:'#fff',
    fontWeight:'300',
    borderBottom:'1px solid #353535'
}

const renderItems = () => (
    links.map((link, i) => (
        <Link to={link.linkTo} key={i}>
            <ListItem button style={styles}>
                {link.title}
            </ListItem>
        </Link>
    ))
)

export default AdminNav;