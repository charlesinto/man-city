import React from 'react';
import { Link } from 'react-router-dom';
import { TableCell } from '@material-ui/core';

const Td = ({ children, to, ...rest}) => {
    const template = to ?  <TableCell {...rest}><Link to={to}>{children}
    </Link></TableCell> : <TableCell {...rest}>{children}</TableCell>
    return template
};

export {Td};