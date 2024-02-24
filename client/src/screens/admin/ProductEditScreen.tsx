import { FC, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Message } from "../../components/Message";
import { Loader } from "../../components/Loader";
import { IError } from "../../interfaces/Error";
import {
 useUpdateProductMutation,
 useGetProductDetailsQuery,
 useUploadImageMutation,
} from "../../redux/slice/productsApiSlice";
import { FormContainer } from "../../components/FormContainer";

export const ProductEditScreen: FC = () => {
 const { id } = useParams();
 const navigate = useNavigate();

 const [name, setName] = useState("");
 const [price, setPrice] = useState(0);
 const [image, setImage] = useState("");
 const [brand, setBrand] = useState("");
 const [category, setCategory] = useState("");
 const [countInStock, setCountInStock] = useState(0);
 const [description, setDescription] = useState("");

 const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
 const typedError = error as IError;

 const [updateProduct, { isLoading: loadingUpdate }] =
  useUpdateProductMutation();
 const [uploadImage] = useUploadImageMutation();

 useEffect(() => {
  if (product) {
   setName(product.name);
   setPrice(product.price);
   setImage(product.image);
   setBrand(product.brand);
   setCategory(product.category);
   setCountInStock(product.countInStock);
   setDescription(product.description);
  }
 }, [product]);

 const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
   await updateProduct({
    productId: id,
    product: {
     name,
     price,
     image,
     brand,
     category,
     countInStock,
     description,
    },
   });
   if (!loadingUpdate) {
    toast.success("Product updated successfully");
    navigate("/admin/productlist");
   }
  } catch (error) {
   const typedError = error as IError;
   toast.error(typedError.data.message);
  }
 };
 const uploadHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const formData = new FormData();
  if (e.target.files) {
   formData.append("image", e.target.files[0]);
   try {
    const res = await uploadImage(formData).unwrap();
    setImage(res.image);
    toast.success(res.message);
   } catch (error) {
    const typedError = error as IError;
    toast.error(typedError.data.message);
   }
  }
 };

 return (
  <>
   <Link to="/admin/productlist" className="btn btn-light my-3">
    Go Back
   </Link>
   <FormContainer>
    <h1>Edit Product</h1>
    {loadingUpdate && <Loader />}
    {isLoading ? (
     <Loader />
    ) : typedError ? (
     <Message variant="danger">{typedError.data.message}</Message>
    ) : (
     <Form onSubmit={(e) => submitHandler(e)}>
      <Form.Group controlId="name" className="my-2">
       <Form.Label>Name</Form.Label>
       <Form.Control
        type="name"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
       ></Form.Control>
      </Form.Group>

      <Form.Group controlId="price" className="my-2">
       <Form.Label>Price</Form.Label>
       <Form.Control
        type="number"
        placeholder="Enter price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
       ></Form.Control>
      </Form.Group>

      <Form.Group controlId="image" className="my-2">
       <Form.Label>Image</Form.Label>
       <Form.Control
        type="text"
        placeholder="Enter image url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
       ></Form.Control>
       <Form.Control
        type="file"
        className="my-2"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
         uploadHandler(e);
        }}
       ></Form.Control>
      </Form.Group>

      <Form.Group controlId="brand" className="my-2">
       <Form.Label>Brand</Form.Label>
       <Form.Control
        type="text"
        placeholder="Enter brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
       ></Form.Control>
      </Form.Group>

      <Form.Group controlId="countInStock" className="my-2">
       <Form.Label>Count In Stock</Form.Label>
       <Form.Control
        type="number"
        placeholder="Enter count in stock"
        value={countInStock}
        onChange={(e) => setCountInStock(Number(e.target.value))}
       ></Form.Control>
      </Form.Group>

      <Form.Group controlId="category" className="my-2">
       <Form.Label>Category</Form.Label>
       <Form.Control
        type="text"
        placeholder="Enter category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
       ></Form.Control>
      </Form.Group>

      <Form.Group controlId="description" className="my-2">
       <Form.Label className="form-label" htmlFor="description">
        Description
       </Form.Label>
       <Form.Control
        as="textarea"
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
       ></Form.Control>
      </Form.Group>
      <Button type="submit" variant="primary">
       Update
      </Button>
     </Form>
    )}
   </FormContainer>
  </>
 );
};
