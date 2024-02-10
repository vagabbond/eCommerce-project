import { FC, ReactNode } from "react";
import { Alert } from "react-bootstrap";
interface IProps {
 variant: string;
 children: string | ReactNode;
}
export const Message: FC<IProps> = ({ variant, children }) => {
 return <Alert variant={variant}>{children}</Alert>;
};
