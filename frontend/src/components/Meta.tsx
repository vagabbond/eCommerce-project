import { FC } from "react";
import { Helmet } from "react-helmet-async";

interface MetaProps {
 title: string;
 description: string;
 keywords: string;
}

export const Meta: FC<MetaProps> = ({ title, description, keywords }) => {
 return (
  <Helmet>
   <title>{title}</title>
   <meta name="description" content={description} />
   <meta name="keyword" content={keywords} />
  </Helmet>
 );
};

Meta.defaultProps = {
 title: "Welcome To ProShop",
 description: "We sell the best products for cheap",
 keywords: "electronics, buy electronics, cheap electronics",
};
