import { FC } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Message } from "../../components/Message";
import { Loader } from "../../components/Loader";
import { Paginate } from "../../components/Paginate";
import {
 useGetProductsQuery,
 useCreateProductMutation,
 useDeleteProductMutation,
} from "../../redux/slice/productsApiSlice";
import { IProduct } from "../../interfaces/Product";
import { IError } from "../../interfaces/Error";

export const ProductListScreen: FC = () => {
 const { pageNumber } = useParams<{ pageNumber: string }>();
 const { data, isLoading, error, refetch } = useGetProductsQuery({
  pageNumber,
 });
 const typedError = error as IError;

 const [createProduct, { isLoading: loadingCreation }] =
  useCreateProductMutation();

 const [deleteProduct] = useDeleteProductMutation();
 const deleteHandler = async (id: string) => {
  if (id) {
   try {
    await deleteProduct(id);
    refetch();
    toast.success("Product deleted successfully");
   } catch (error) {
    const typedError = error as IError;
    toast.error(typedError.data.message);
   }
  }
 };
 const createProductHandler = async () => {
  try {
   await createProduct({});
   refetch();
   if (!loadingCreation) {
    toast.success("Product created successfully");
   }
  } catch (error) {
   const typedError = error as IError;
   toast.error(typedError.data.message);
  }
 };
 return (
  <>
   <Row>
    <Col>
     <h1>Products</h1>
    </Col>
    <Col className="text-end">
     <Button className="btn-sm my-3" onClick={createProductHandler}>
      <FaEdit /> Create Product
     </Button>
    </Col>
   </Row>
   {isLoading ? (
    <Loader />
   ) : typedError ? (
    <Message variant="danger">{typedError.data.message}</Message>
   ) : (
    <>
     <Table striped hover responsive className="table-sm">
      <thead>
       <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>PRICE</th>
        <th>CATEGORY</th>
        <th>BRAND</th>
        <th></th>
       </tr>
      </thead>
      <tbody>
       {data.products.map((product: IProduct) => (
        <tr key={product._id}>
         <td>{product._id}</td>
         <td>{product.name}</td>
         <td>${product.price}</td>
         <td>{product.category}</td>
         <td>{product.brand}</td>
         <td>
          <LinkContainer to={`/admin/product/${product._id}/edit`}>
           <Button variant="light" className="btn-sm">
            <FaEdit />
           </Button>
          </LinkContainer>
          <Button
           variant="danger"
           className="btn-sm"
           onClick={() => deleteHandler(product._id)}
          >
           <FaTrash style={{ color: "white" }} />
          </Button>
         </td>
        </tr>
       ))}
      </tbody>
     </Table>
     <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <Paginate page={data.page} pages={data.pages} />
     </div>
    </>
   )}
  </>
 );
};
