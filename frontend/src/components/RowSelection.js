import React, { useMemo } from "react";
import { useTable, useRowSelect, useSortBy } from "react-table";
import { COLUMNS } from "./columns";
import "./table.css";
import { Checkbox } from "./Checkbox";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
export const RowSelection = () => {
  const sendMailData = async (e) => {
    const flatrows = JSON.stringify(
      {
        selectedFlatRows: selectedFlatRows.map((row) => row.original),
      },
      null,
      2
    );
    console.log(flatrows);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/MailData",
        { flatrows },
        config
      );
      if(data){
       alert("Mail Sent!")
      }
    } catch (error) {
      console.log(error)
    }
  };
  const [data, setData1] = useState([]);
  const fetchInfo = async () => {
    let config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const data2 = await axios.post("/api/users/", config);
    setData1(data2.data);
    console.log(data2.data);
    console.log("Hello");
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  const columns = useMemo(() => COLUMNS, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const firstPageRows = rows.slice(0, 10);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}{" "}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button style={{ marginLeft: 40, marginTop: 15 }} onClick={sendMailData}>
        Send Mail
      </Button>
    </>
  );
};
