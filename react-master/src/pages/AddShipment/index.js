import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePagination, useTable } from "react-table";
import { deleteShipment, getShipment } from "../../Redux/ShipmentSlice";

const Shipment = () => {
  // const BUTTON = "btn btn-outline-secondary mx-1";

  const [search, setSearch] = useState();
  const [showModal, setShowModel] = useState(false);
  const [id, setId] = useState();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.shipment.shipmentData);
  const totalRecords = useSelector((state) => state.shipment.totalRecords);

  const columns = useMemo(
    () => [
      {
        Header: "Patient Name",
        accessor: "patinetName",
      },
      {
        Header: "Username",
        accessor: "ownerName",
      },
      {
        Header: "Medicaiton Name",
        accessor: "medicationName",
      },
      {
        Header: "Shipment Date",
        accessor: "deliveryDate",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Next Shipment Date",
        accessor: "nextDeliveryDate",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Track URL",
        accessor: "trackUrl",
      },
      {
        Header: "Dosage",
        accessor: "dosage",
      },
      {
        Header: "Address",
        accessor: "addressLine",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: (props) => (
          <>
            <i className="fas fa-pen text-primary mx-2" onClick={() => handleEdit(props)}></i>

            <i
              className="fas fa-trash-can text-danger mx-2"
              onClick={() => handleDelete(props)}
            ></i>
          </>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    prepareRow,
    page,
    // canPreviousPage,
    // canNextPage,
    // pageOptions,
    // pageCount,
    // gotoPage,
    // nextPage,
    // previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    usePagination
  );

  let pages = [];
  for (let i = 1; i <= Math.ceil(totalRecords / pageSize); i++) {
    pages.push(i);
  }
  // console.log(pages);
  const [start, setStart] = useState(0);
  const clickHandler = (page) => {
    setStart(pageSize * page - pageSize);
  };
  // console.log('start: ', start);

  useEffect(() => {
    let requestPayload = {
      start: start,
      length: pageSize,
      search: search || "",
    };

    dispatch(getShipment(requestPayload));
  }, [pageSize, search, start, showModal]);

  const handleEdit = (cell) => {
    // console.log("cell: ", cell.row.original);
    navigate(`/add-shipment/edit/${cell.row.original._id}`);
  };

  const handleDelete = (cell) => {
    setId(cell.row.original._id)
    setShowModel(true);
    
  };

  const handleDeleteData = (id) => {
    let requestPayload = {
      _id: id
    }
    dispatch(deleteShipment(requestPayload));
    setShowModel(false);

  }

  return (
    <>
      <div className="card m-auto mx-5 my-5">
        <div className="card-body">
          <h3>Add Shipment</h3> <br />
          <div className="d-flex justify-content-between">
            <input
              type="text"
              className="mb-4"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              className="btn btn-primary mb-4"
              onClick={() => navigate("/add-shipment/add")}
            >
              Add
            </button>
          </div>
          <div className="table-responsive">
            <table
              {...getTableProps()}
              className="table table-bordered m-auto w-100"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} scope="col">
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>{" "}
            <br />
            <div className="pagination d-flex justify-content-between">
              <div>
                <select
                  className="custom-select"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
                <span className="mx-3">Total: {totalRecords} Results</span>
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <button className="page-link" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </button>
                  </li>
                  {pages.map((page) => (
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => clickHandler(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  <li className="page-item">
                    <button className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </button>
                  </li>
                </ul>
              </nav>
              {/* <button
                className={BUTTON}
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {"<<"}
              </button>{" "}
              <button
                className={BUTTON}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"<"}
              </button>{" "}
              <button
                className={BUTTON}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                {">"}
              </button>{" "}
              <button
                className={BUTTON}
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>{" "}
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span> */}
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModel(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure want to delete this shipment?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModel(false)}>Close</Button>
            <Button variant="danger" onClick={() => handleDeleteData(id)}>Delete</Button>
          </Modal.Footer>
        </Modal>
    </>
  );
};

export default Shipment;
