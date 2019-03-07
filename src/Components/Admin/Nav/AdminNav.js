import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '@material-ui/core';
import { firebase } from '../../../Firebase'

const AdminNav = ({activeLink, matches}) => {
    return (
        <div>
            {renderItems(activeLink, matches)}
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
        title:'Home',
        linkTo: '/dashboard'
    },
    {
        title:'Matches',
        linkTo: '/admin_matches'
    },
    {
        title:'Add Matches',
        linkTo: '/admin_matches/edit_match'
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

const renderItems = (activeLink, matches) => (
    links.map((link, i) => (
        (activeLink && activeLink === link.title) ?
        <Link to={'#'} key={i}>
            <ListItem button style={{...styles, background:'rgb(152, 197, 233)'}}>
                { matches ? (link.title === 'Add Matches' ? 
                (matches.params.id ? 'Edit Match' : link.title) : link.title) : link.title }
            </ListItem>
        </Link> :
        <Link to={link.linkTo} key={i}>
            <ListItem button style={styles}>
            { matches ? (link.title === 'Add Matches' ? 
                (matches.params.id ? 'Edit Match' : link.title) : link.title) : link.title }
            </ListItem>
        </Link>
    ))
)

export default AdminNav;