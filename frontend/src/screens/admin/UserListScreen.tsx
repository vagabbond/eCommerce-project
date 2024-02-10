import { FC } from "react";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import {
 useGetAllUsersQuery,
 useDeleteUserMutation,
} from "../../redux/slice/userApiSlice";
import { Paginate } from "../../components/Paginate";
import { Message } from "../../components/Message";
import { Loader } from "../../components/Loader";
import { IError } from "../../interfaces/Error";
import { IUser } from "../../interfaces/User";

export const UserListScreen: FC = () => {
 const { pageNumber } = useParams<{ pageNumber: string }>();
 const { data, isLoading, error, refetch } = useGetAllUsersQuery({
  pageNumber,
 });
 const typedError = error as IError;

 const [deleteUser] = useDeleteUserMutation();

 const deleteHandler = async (id: string) => {
  if (id) {
   try {
    await deleteUser(id);
    refetch();
    toast.success("User deleted successfully");
   } catch (error) {
    const typedError = error as IError;
    toast.error(typedError.data.message);
   }
  }
 };
 return (
  <>
   <h1>Users</h1>
   {isLoading ? (
    <Loader />
   ) : typedError ? (
    <Message variant="danger">{typedError.data.message}</Message>
   ) : (
    <>
     <Table striped bordered hover responsive className="table-sm">
      <thead>
       <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>EMAIL</th>
        <th>ADMIN</th>
        <th></th>
       </tr>
      </thead>
      <tbody>
       {data.users?.map((user: IUser) => (
        <tr key={user._id}>
         <td>{user._id}</td>
         <td>{user.name}</td>
         <td>
          <a href={`mailto:${user.email}`}>{user.email}</a>
         </td>
         <td>
          {user.isAdmin ? <FaCheck color="green" /> : <FaTimes color="red" />}
         </td>
         <td>
          <LinkContainer to={`/admin/user/${user._id}/edit`} className="mx-2">
           <Button variant="light" className="btn-sm">
            <FaEdit />
           </Button>
          </LinkContainer>
          <Button
           variant="danger"
           className="btn-sm"
           onClick={() => deleteHandler(user._id)}
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
