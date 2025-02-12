import React, { useState } from 'react'

export default function AddProduct() {
  const [Productname,setProductname]= useState("")
  const [Description,setDescription]= useState("")
  const [Price,setPrice]= useState("")
  const [Productlst,setProductlst]= useState([])
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
      getProducts();
  }, []);

  function handleAddProduct(){
      const obj ={ Productname, Description, Price}
      axios
          .post("http://localhost:8080/AddProduct", obj)
          .then((res) => {
              toast.success("Product added successfully");
              clearAll();
              getProducts();
          })
          .catch((error)=> {
              console.log(error);
              toast.error("Failed to add product");
          });
  }

  function getProducts() {
      axios
          .get("http://localhost:8080/GetProduct")
          .then((res) => {
              setProductlst(res.data);
          })
          .catch((error) => {
              console.log(error);
              toast.error("Failed to fetch products");
          });
  }

  function handleUpdateProduct(id) {
      const obj = { ProductId: id, Productname, Description, Price };
      axios
          .put(`http://localhost:8080/products/${id}`, obj)
          .then((res) => {
              toast.success("Product updated successfully");
              clearAll();
              getProducts();
          })
          .catch((error) => {
              console.log(error);
              toast.error("Failed to update product");
          });
  }

  function handleDeleteProduct(id) {
      axios
          .delete(`http://localhost:8080/products/${id}`)
          .then((res) => {
              toast.success("Product deleted successfully");
              getProducts();
          })
          .catch((error) => {
              console.log(error);
              toast.error("Failed to delete product");
          });
  }

  function clearAll() {
      setProductname("");
      setDescription("");
      setPrice("");
      setSelectedId(null);
  }
  return (
    <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h4>{selectedId ? 'Update Product' : 'Add Product'}</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            selectedId ? handleUpdateProduct(selectedId) : handleAddProduct();
                        }}>
                            <div className="mb-3">
                                <label className="form-label">Product Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={Productname}
                                    onChange={(e) => setProductname(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    value={Description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={Price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-primary">
                                    {selectedId ? 'Update' : 'Add'} Product
                                </button>
                                {selectedId && (
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary"
                                        onClick={clearAll}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
  )
}
