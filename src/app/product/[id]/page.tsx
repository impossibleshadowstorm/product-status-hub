"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const EditProduct: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const productId = pathname.split("/")[2];

  const [formData, setFormData] = useState({
    brandName: "",
    genericName: "",
    partyName: "",
    packing: "",
    boxSize: "",
    foilSize: "",
    designDate: "",
    approvalDate: "",
    boxCdrSent: "",
    labelCdrSent: "",
    cylinderCdrSent: "",
  });

  const [checkedState, setCheckedState] = useState({
    boxCdr: false,
    labelCdr: false,
    cylinderCdr: false,
  });

  useEffect(() => {
    if (productId) {
      axios
        .get(`/api/products/${productId}`)
        .then((response) => {
          const data = response.data;
          setFormData({
            brandName: data.brandName || "",
            genericName: data.genericName || "",
            partyName: data.partyName || "",
            packing: data.packing || "",
            boxSize: data.boxSize || "",
            foilSize: data.foilSize || "",
            designDate: data.designDate ? data.designDate.slice(0, 10) : "",
            approvalDate: data.approvalDate
              ? data.approvalDate.slice(0, 10)
              : "",
            boxCdrSent: data.boxCdrSent ? data.boxCdrSent.slice(0, 10) : "",
            labelCdrSent: data.labelCdrSent
              ? data.labelCdrSent.slice(0, 10)
              : "",
            cylinderCdrSent: data.cylinderCdrSent
              ? data.cylinderCdrSent.slice(0, 10)
              : "",
          });
          setCheckedState({
            boxCdr: !!response.data.boxCdrSent,
            labelCdr: !!response.data.labelCdrSent,
            cylinderCdr: !!response.data.cylinderCdrSent,
          });
        })
        .catch((error) => console.error("Error fetching product data:", error));
    }
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    const newCheckedState = { ...checkedState, [name]: checked };

    // Ensure no more than two checkboxes are selected
    const selectedCount = Object.values(newCheckedState).filter(Boolean).length;
    if (selectedCount > 2) return;

    setCheckedState(newCheckedState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`/api/products/${productId}`, {
        ...formData,
        boxCdrSent: checkedState.boxCdr ? formData.boxCdrSent : null,
        labelCdrSent: checkedState.labelCdr ? formData.labelCdrSent : null,
        cylinderCdrSent: checkedState.cylinderCdr
          ? formData.cylinderCdrSent
          : null,
      });
      router.push("/"); // Redirect to the main page after submission
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Brand Name</label>
          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Generic Name</label>
          <input
            type="text"
            name="genericName"
            value={formData.genericName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Party Name</label>
          <input
            type="text"
            name="partyName"
            value={formData.partyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Packing</label>
          <input
            type="text"
            name="packing"
            value={formData.packing}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Box Size</label>
          <input
            type="text"
            name="boxSize"
            value={formData.boxSize}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Foil/Label Size</label>
          <input
            type="text"
            name="foilSize"
            value={formData.foilSize}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Design Date</label>
          <input
            type="date"
            name="designDate"
            value={formData.designDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Approval Date</label>
          <input
            type="date"
            name="approvalDate"
            value={formData.approvalDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="boxCdr"
              checked={checkedState.boxCdr}
              onChange={handleCheckboxChange}
            />
            Box CDR Sent
          </label>
          {checkedState.boxCdr && (
            <input
              type="date"
              name="boxCdrSent"
              value={formData.boxCdrSent}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="labelCdr"
              checked={checkedState.labelCdr}
              onChange={handleCheckboxChange}
            />
            Label CDR Sent
          </label>
          {checkedState.labelCdr && (
            <input
              type="date"
              name="labelCdrSent"
              value={formData.labelCdrSent}
              onChange={handleChange}
            />
          )}
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="cylinderCdr"
              checked={checkedState.cylinderCdr}
              onChange={handleCheckboxChange}
            />
            Cylinder CDR Sent
          </label>
          {checkedState.cylinderCdr && (
            <input
              type="date"
              name="cylinderCdrSent"
              value={formData.cylinderCdrSent}
              onChange={handleChange}
            />
          )}
        </div>

        <button type="submit" className="btn-submit">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
