import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Table,TableHead, TableBody, TableCell, TableFooter, TablePagination,
    TableRow, Paper
} from '@material-ui/core';

import TablePaginationActionsWrapper from '../Matches/TablePaginationActions';
import { Td } from '../../Common';

class TableView extends Component {
    state = {
        players: this.props.players,
        page: 0,
        rowsPerPage: 15,
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
      };
    
      handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
      };
    
      render() {
        
        const { classes } = this.props;
        const { players, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, players.length - page * rowsPerPage);
    
        return (
          <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell><span className="table-head">First Name</span></TableCell>
                        <TableCell><span className="table-head">Last Name</span></TableCell>
                        <TableCell><span className="table-head">Number</span></TableCell>
                        <TableCell><span className="table-head">Position</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {players.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                        <TableRow key={row.uid}>
                        <Td to={`/players/add_player/${row.uid}`} align="right">
                            <span className="table-cell">{row.name}</span> 
                        </Td>
                        <Td to={`/players/add_player/${row.uid}`} align="center">   
                            <span className="table-cell">{row.lastname}</span> 
                        </Td>
                        <Td to={`/players/add_player/${row.uid}`} align="center">
                        <span className="table-cell">{row.number} </span> 
                        </Td>
                        <Td to={`/players/add_player/${row.uid}`} align="center">
                        <span className="table-cell">{row.position}</span>
                        </Td>
                        </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5,10,25,100]}
                      colSpan={3}
                      count={players.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        native: true,
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActionsWrapper}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </Paper>
        );
      }
}

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  });

export default withStyles(styles, { withTheme: true })(TableView);