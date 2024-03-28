import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URLS from "../apiUrls";

interface Role {
  id: number;
  name: string;
}

interface FormData {
  name: string;
  email: string;
  role_id: number[];
}

function UserForm() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(API_URLS.roles);
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchRoles();
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    role_id: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    if (name === "role") {
      if (checked) {
        setFormData({
          ...formData,
          role_id: [...formData.role_id, parseInt(value)],
        });
      } else {
        setFormData({
          ...formData,
          role_id: formData.role_id.filter(
            (roleId) => roleId !== parseInt(value)
          ),
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let HomeURL = "/";
    try {
      if (formData.role_id.length === 0) {
        setError("Please select at least one role.");
        return;
      }

      const response = await axios.post(API_URLS.user, formData);
      console.log("Data submitted successfully:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error submitting data:", error);
      setError("Error submitting data. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="mb-3 col-md-6">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3 col-md-6">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3 col-md-6">
        <label htmlFor="role" className="form-label">
          Roles
        </label>
        {roles.map((role) => (
          <div className="form-check" key={role.id}>
            <input
              type="checkbox"
              className="form-check-input"
              id={`role-${role.id}`}
              value={role.id}
              onChange={handleChange}
              name="role"
            />
            <label className="form-check-label" htmlFor={`role-${role.id}`}>
              {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
            </label>
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default UserForm;
