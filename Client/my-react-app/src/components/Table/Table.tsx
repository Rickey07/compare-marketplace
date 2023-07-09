import "./Table.css";
import { tableColumn } from "../../models";
import { ExternalLink,Copy } from "react-feather";
type Product = {
  name?: string;
  amz_price?: string;
  flip_price?: string;
  flip_rating?: string;
  amz_rating?: string;
  amz_link?: string;
  fliplink?: string;
  flip_image?: string;
  amz_image?: string;
};

interface propTypes {
  columns?: tableColumn[];
  data?: Product[];
}

interface propTypesProductCell {
  name: string;
  amz_image?: string;
  link?: string;
}

interface propTypesLink {
  link?: string;
}

const ProductNameTableCell = ({
  name,
  amz_image,
  link,
}: propTypesProductCell) => {
  const splicedString = name?.length > 40 ? name?.slice(0, 40) + "..." : name;
  return (
    <>
      <div className="main-product-container">
        <div className="product-container">
          <div className="product-image-container">
            <img alt="Product" src={amz_image} className={"product-image"} />
          </div>
          <span title={name}>{splicedString}</span>
        </div>
        <a href={link} target={"_blank"} className={"product-redirect"}>
          <ExternalLink color="blue" />
        </a>
      </div>
    </>
  );
};

const LinkWithShare = ({ link }: propTypesLink) => {
  const slicedString = link?.slice(0,20)
  return (
    <>
      <div className="share-link-container">
        <a href={link} target={"_blank"}>{slicedString}</a>
        <Copy className="copy-icon"/>
      </div>
    </>
  );
};

const Table = ({ columns, data }: propTypes) => {
  const link_product_cell = ["amz_link", "flip_link"];
  return (
    <div className="table-container-inner">
      <table>
        <thead>
          <tr>
            {columns?.map((th: tableColumn) => {
              return (
                <th className="table-head" key={th.fieldName}>
                  {th.fieldName}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.length ? (
            data?.map((tableData: Product) => {
              return (
                <tr key={tableData?.name}>
                  {tableData?.name && (
                    <>
                      <td>
                        <ProductNameTableCell
                          name={tableData?.name}
                          amz_image={tableData?.amz_image}
                          link={tableData?.amz_link}
                        />
                      </td>
                    </>
                  )}
                  {columns?.map((th: tableColumn) => {
                    const id = th?.id;
                    if (th.fieldName !== "Product Name") {
                      return link_product_cell.includes(th.id) ? (
                        <td>
                          <LinkWithShare
                            link={tableData[id as keyof Product]}
                          />
                        </td>
                      ) : (
                        <td>{tableData[id as keyof Product]}</td>
                      );
                    }
                  })}
                </tr>
              );
            })
          ) : (
            <>
              <h1>No Data Found</h1>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
