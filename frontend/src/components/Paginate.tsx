import { FC } from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

interface PaginateProps {
 page: number;
 pages: number;
 keyword?: string;
}

export const Paginate: FC<PaginateProps> = ({ page, pages, keyword }) => {
 const data = useLocation();
 const isInAdmin = data.pathname.includes("/admin");
 const typeOfPage = isInAdmin
  ? data.pathname.split("/")[2]
  : data.pathname.split("/")[1];

 return pages > 1 ? (
  <Pagination>
   {[...Array(pages).keys()].map((x) => (
    <LinkContainer
     key={x + 1}
     to={
      isInAdmin
       ? `/admin/${typeOfPage}/${x + 1}`
       : keyword
       ? `/search/${keyword}/page/${x + 1}`
       : `/page/${x + 1}`
     }
    >
     <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
    </LinkContainer>
   ))}
  </Pagination>
 ) : null;
};
