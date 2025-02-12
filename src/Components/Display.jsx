import React from 'react'

export default function Display() {
 
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
    <div className="col-md-8">
                <div className="card">
                    <div className="card-header">
                        <h4>Products List</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead className="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Product Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Productlst.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.Productname}</td>
                                            <td>{product.Description}</td>
                                            <td>${product.Price}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-primary me-2"
                                                    onClick={() => {
                                                        setSelectedId(product.id);
                                                        setProductname(product.Productname);
                                                        setDescription(product.Description);
                                                        setPrice(product.Price);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
  )
}
