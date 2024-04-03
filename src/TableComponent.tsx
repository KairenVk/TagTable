import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, TableSortLabel
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {ResponseObject} from "./ResponseObject";
import { visuallyHidden } from '@mui/utils';
import {ItemObject} from "./ItemObject";
import LoadingComponent from "./LoadingComponent";
import PropTypes from "prop-types";
import ErrorComponent from "./ErrorComponent";



type Order = 'asc' | 'desc';
type LoadingState = 'loading' | 'loaded' | 'error';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string | boolean},
    b: { [key in Key]: number | string | boolean},
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof ItemObject;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Tag',
    },
    {
        id: 'count',
        numeric: true,
        disablePadding: false,
        label: 'Post Count',
    }
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ItemObject) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {order, orderBy, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof ItemObject) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function TableComponent(props: any) {
    
    let emptyObj: ResponseObject = {has_more:false,items:[],quota_max:0,quota_remaining:0}

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof ItemObject>('name');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [responseObject, setResponseObject] = useState<ResponseObject>(emptyObj);
    const [loadingState, setLoadingState] = useState<LoadingState>('loading');

    useEffect(() => {
        setRowsPerPage(props.rows);
        setOrder(props.orderDirection);
        setOrderBy(props.orderByColumn);
        setLoadingState(props.loadingState);
        setPage(props.page);
    }, [props.loadingState, props.orderByColumn, props.orderDirection, props.page, props.rows]);


    useEffect(() => {
        fetch("https://api.stackexchange.com/tags?site=stackoverflow&pagesize=100", {
            method: "GET",
        })
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                console.log(responseData)
                if(responseData.error_id !== undefined) {
                    setResponseObject(responseData)
                    setLoadingState("error")
                }
                else {
                    setResponseObject(responseData);
                    setLoadingState("loaded");
                }
            })
    }, []);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof ItemObject,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - responseObject.items.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            responseObject.items?.sort(getComparator(order, orderBy)).slice(page * rowsPerPage,
                page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, responseObject],
    );

    if (loadingState === "loading") {
        return (
            <LoadingComponent/>
        )
    }
    else if (loadingState === "error") {
        return (
            <ErrorComponent responseObject={responseObject}/>
        )
    }
    else {
        return (
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={responseObject.items.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        align='center'
                    />
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={responseObject.items.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.count}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        );
    }
}

TableComponent.propTypes = {
    rows: PropTypes.number.isRequired,
    orderDirection: PropTypes.oneOf(['asc', 'desc']),
    orderByColumn: PropTypes.oneOf<keyof ItemObject>(['name', 'count']),
    loadingState: PropTypes.oneOf(['loading','loaded','error']),
    page: PropTypes.number.isRequired
}

TableComponent.defaultProps = {
    rows: 5,
    orderDirection: 'asc',
    orderByColumn: 'name',
    loadingState: 'loading',
    page: 0
}

export default TableComponent;