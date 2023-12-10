import { Container, Form, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
import "./Products.scss";
import { products, categories } from "../../helper/data";
import { Header } from "../header/Header";
import { useState } from "react";

const ProductsList = () => {
  const [newArr, setNewArr] = useState(products);
  const [btnActive, setBtnActive] = useState("all");
  const [search, setSearch] = useState("");

  const handleCtecory = (e) => {
    if (e.target.textContent.toLowerCase() === "all") {
      setNewArr(products);
      setBtnActive("all");
    } else {
      setNewArr(
        products.filter(
          (item) =>
            e.target.textContent.toLowerCase() === item.category.toLowerCase()
        )
      );
      setBtnActive(e.target.textContent.toLowerCase());
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.trim().toLowerCase());

    // console.log(newArr);
    const filteredProducts = newArr.filter((item) =>
      item.title.toString().toLocaleLowerCase().includes(search)
    );
    setNewArr(filteredProducts);
  };

  return (
    <>
      <Header
        categories={categories}
        handleCtecory={handleCtecory}
        btnActive={btnActive}
      />
      <Form.Control
        value={search}
        onChange={handleSearch}
        placeholder="Search Product..."
        type="search"
        className="w-50 m-auto"
      />
      <Container className="product-list rounded-4 my-4 p-3">
        <Row className="g-3 justify-content-center">
          {newArr.map((product) => [
            <ProductCard product={product} key={product.id} />,
          ])}
        </Row>
      </Container>
    </>
  );
};

export default ProductsList;
