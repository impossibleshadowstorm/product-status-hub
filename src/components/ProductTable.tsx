"use client";
import React, { useEffect, useState } from "react";
import { ReactTabulator, ColumnDefinition } from "react-tabulator";
import { useRouter } from "next/navigation"; // Import useRouter
import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/tabulator.min.css"; // tabulator theme
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import dayjs from "dayjs";
import { showNotification } from "./notification";
import { ToastContainer } from "react-toastify";

interface Product {
  id: number;
  brandName: string;
  genericName: string;
  partyName: string;
  packing: string;
  boxSize: string;
  foilSize: string;
  designDate: string;
  approvalDate: string;
  boxCdrSent: string;
  labelCdrSent: string;
  cylinderCdrSent: string;
}

// Formatter function for date columns
const dateFormatter = (cell: any) => {
  const date = dayjs(cell.getValue());
  return date.isValid() ? date.format("DD-MM-YYYY") : "";
};

// Formatter function for conditional cell styling
const conditionalFormatter = (cell: any) => {
  const value = cell.getValue();
  const formattedDate = dateFormatter(cell);
  cell.getElement().style.backgroundColor = !value ? "#ff9090" : "transparent";
  return formattedDate;
};

const ProductTable: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/products/${id}`);
      // Update the state to remove the deleted product
      setData(data.filter((product) => product.id !== id));
      showNotification("success", "Product deleted successfully", 2000);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Formatter function for the action column
  const actionFormatter = (cell: any) => {
    const editIcon = document.createElement("span");
    editIcon.className = "material-symbols-outlined";
    editIcon.textContent = "edit";
    editIcon.style.cursor = "pointer";
    editIcon.addEventListener("click", () => {
      router.push(`/product/${cell.getRow().getData().id}`);
    });

    const deleteIcon = document.createElement("span");
    deleteIcon.className = "material-symbols-outlined";
    deleteIcon.textContent = "delete";
    deleteIcon.style.cursor = "pointer";
    deleteIcon.addEventListener("click", () => {
      handleDelete(cell.getRow().getData().id);
    });

    const containerDiv = document.createElement("div");
    containerDiv.appendChild(editIcon);
    containerDiv.appendChild(deleteIcon);

    return cell.getElement().appendChild(containerDiv);
  };

  const columns: ColumnDefinition[] = [
    {
      title: "Brand Name",
      field: "brandName",
      sorter: "string",
      headerFilter: "input",
    },
    {
      title: "Generic Name",
      field: "genericName",
      sorter: "string",
      headerFilter: "input",
    },
    {
      title: "Party Name",
      field: "partyName",
      sorter: "string",
      headerFilter: "input",
    },
    {
      title: "Packing",
      field: "packing",
      sorter: "string",
      headerFilter: "input",
    },
    {
      title: "Box Size",
      field: "boxSize",
      sorter: "string",
      headerFilter: "input",
    },
    {
      title: "Foil/Label Size",
      field: "foilSize",
      sorter: "string",
      headerFilter: "input",
    },
    {
      title: "Design Date",
      field: "designDate",
      sorter: "string",
      formatter: conditionalFormatter,
    },
    {
      title: "Approval Date",
      field: "approvalDate",
      sorter: "string",
      formatter: conditionalFormatter,
    },
    {
      title: "Box CDR Sent",
      field: "boxCdrSent",
      sorter: "string",
      formatter: conditionalFormatter,
    },
    {
      title: "Label CDR Sent",
      field: "labelCdrSent",
      sorter: "string",
      formatter: conditionalFormatter,
    },
    {
      title: "Cylinder CDR Sent",
      field: "cylinderCdrSent",
      sorter: "string",
      formatter: conditionalFormatter,
    },
    {
      title: "Action",
      field: "actions",
      formatter: actionFormatter,
      hozAlign: "center",
      headerSort: false,
    },
  ];

  const options = {
    movableColumns: true,
    resizableRows: true,
    layout: "fitDataFill",
  };

  // Handler for navigating to the add-product page
  const handleAddProductClick = () => {
    router.push("/add-product");
  };

  return (
    <div>
      <ToastContainer />
      <div className="header">
        <div></div>
        <h1>Product Status</h1>
        <div className="button" onClick={handleAddProductClick}>
          Add New Product
        </div>
      </div>
      <div className="table">
        <ReactTabulator
          data={data}
          columns={columns}
          tooltips={true}
          // layout="fitData"
          layout="fitDataFill"
          options={options}
        />
      </div>
    </div>
  );
};

export default ProductTable;
