import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "../styles/product-details.css";

import ProductCard from "../components/UI/product-card/ProductCard";
import { useContext } from "react";
import { CartContext } from "../context";
import { HOST } from "../env/config";

const FoodDetails = () => {
  const [tab, setTab] = useState("desc");
  const { id } = useParams();
  const [previewImg, setPreviewImg] = useState("");
  
  const { carts, setCarts } = useContext(CartContext)
  
  const [product, setProduct] = useState({})
  const [review, setReview] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProductDetail()
    getReview()
    getProducts()
  }, [])

  let getProducts = async () => {
    let response = await fetch(`${HOST}/api/product`);
    let data = await response.json();
    setProducts(data);
  };

  const addToCart = async () => {
    const index = carts.findIndex((item) => {
      return item.id === id;
    });

    if (index !== -1) {
      let newCart = [...carts];

      newCart[index] = {
        ...newCart[index],
        quantity: newCart[index].quantity + 1,
      };

      setCarts(newCart)
      sessionStorage.setItem("carts", JSON.stringify(newCart))
    } else {
      let newCart = [...carts, {"id": id, "name": product.name, "image": product.image, "price": product.price, "quantity": 1}]
      setCarts(newCart)
      sessionStorage.setItem("carts", JSON.stringify(newCart))
  }
}

  const relatedProduct = products.filter((item) => product.category === item.category);

  const getProductDetail = async () => {
    await fetch(`${HOST}/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setPreviewImg(data.image)
      })
  }

  const getReview = async () => {
    await fetch(`${HOST}/api/product/${id}/review`)
      .then((res) => res.json())
      .then((data) => {
        setReview(data)
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title="Product-details">
      <CommonSection title={product.name} />

      <section>
        <Container>
          <Row>
            <Col lg="2" md="2">
              <div className="product__images ">
                <div className="img__item" >
                  <img src={previewImg} alt="" className="w-50" />
                </div>
              </div>
            </Col>
            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={previewImg} alt="" className="w-100" />
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{product.name}</h2>
                <p className="product__price">
                  {" "}
                  Price: <span>${product.price}</span>
                </p>
                <p className="category mb-5">
                  <span>{product.category_name}</span>
                </p>
                <button onClick={() => addToCart()} className="addTOCart__btn">
                  Add to Cart
                </button>
              </div>
            </Col>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h6
                  className={` ${tab === "desc" ? "tab__active" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={` ${tab === "rev" ? "tab__active" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Review
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content">
                  <p>{product.description}</p>
                </div>
              ) : (
                <div className="tab__form mb-3 pd-5">
                  {review.map((item) => (
                    <Tr item={item} key={item.id}/>
                  ))}
                </div>
              )}
            </Col>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">You might also like</h2>
            </Col>

            {relatedProduct.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = (props) => {
  const {rating, name, email, content} = props.item
  return (
    <div className="review">
      <p className="user__name mb-0">{name}</p>
      <p className="user__email">{email}</p>
      <p className="feedback__text">{rating}</p>
      <p className="feedback__text">{content}</p>
    </div>
  )
}

export default FoodDetails;
