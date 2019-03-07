import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {Table,TableHead, TableBody, TableCell, TableFooter, TablePagination,
    TableRow, Paper
} from '@material-ui/core';

import TablePaginationActionsWrapper from './TablePaginationActions';

class TableView extends Component {
    state = {
        matches: this.props.matches,
        page: 0,
        rowsPerPage: 10,
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
      };
    
      handleChangeRowsPerPage = event => {
        this.setState({ page: 0, rowsPerPage: event.target.value });
      };
    
      render() {
        
        const { classes } = this.props;
        const { matches, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, matches.length - page * rowsPerPage);
    
        return (
          <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell><span className="table-head">Date</span></TableCell>
                        <TableCell><span className="table-head">Match</span></TableCell>
                        <TableCell><span className="table-head">Result</span></TableCell>
                        <TableCell><span className="table-head">Final</span></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {matches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                    <TableRow key={row.uid}>
                      <TableCell align="right"><span className="table-cell">{row.date}</span> </TableCell>
                      <TableCell align="center">
                        <Link to={`/admin_matches/edit_match/${row.uid}`}>
                        <span className="table-cell">{row.away} <strong>-</strong> {row.local}</span> 
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                      <span className="table-cell"> {row.resultLocal} <strong>-</strong> {row.resultAway} </span> 
                      </TableCell>
                      <TableCell align="center">
                      <span className="table-cell">{
                          row.final === 'Yes' ? <span className="matches_tag_red">Final</span>  : 
                          <span className="matches_tag_green">Not played yet</span>
                        } </span>
                      </TableCell>
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
                      count={matches.length}
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