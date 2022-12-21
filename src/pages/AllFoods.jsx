import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

import { Container, Row, Col } from "reactstrap";

//import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";

import "../styles/all-foods.css";
import "../styles/pagination.css";
import { useNavigate } from "react-router-dom";
import { HOST } from "../env/config";

const AllFoods = () => {
  const navigate = useNavigate()
  const [sortTerm, setSortTerm] = useState("default")
  const [filter, setFilter] = useState('default')
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([])
  const [pageNumber, setPageNumber] = useState(0);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
    getCategories()
  }, []);

  useEffect(async () => {
    if (filter == 'default') {
      getProducts()
    } else {
      await fetch(`${HOST}/api/admin/product`, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((data) => {
          let items = data.filter((item) => item.category == filter)
          setProducts(items)
        })
        .catch((error) => {
          console.log(error)
          navigate('/error')
        })
    }
  }, [filter])

  useEffect(() => {
    var sorted = null;
    switch (sortTerm) {
      case "default":
        getProducts();
      break;
      case "ascending":
        sorted = [...products].sort(ascending_name)
        setProducts(sorted)
      break;
      case "descending":
        sorted = [...products].sort(descending_name)
        setProducts(sorted)
      break;
      case "high-price":
        sorted = [...products].sort(descending_price)
        setProducts(sorted)
      break;
      case "low-price":
        sorted = [...products].sort(ascending_price)
        setProducts(sorted)
      break;
      default:
        break;
    }
  }, [sortTerm])
  
  let getProducts = async () => {
    await fetch(`${HOST}/api/product`)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
      console.log(error);
      navigate('/error')
    })
  };

  let getCategories = async () => {
    await fetch(`${HOST}/api/admin/category`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
      })
      .catch((error) => {
        console.log(error)
        navigate('/error')
      })
  }

  const searchedProduct = products.filter((item) => {
    if (searchTerm.value === "") {
      return item;
    }
    if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });

  function ascending_name( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }
  
  function descending_name( a, b ) {
    if ( a.name < b.name ){
      return 1;
    }
    if ( a.name > b.name ){
      return -1;
    }
    return 0;
  }
  
  function ascending_price( a, b ) {
    if ( a.price < b.price ){
      return -1;
    }
    if ( a.price > b.price ){
      return 1;
    }
    return 0;
  }
  
  function descending_price( a, b ) {
    if ( a.price < b.price ){
      return 1;
    }
    if ( a.price > b.price ){
      return -1;
    }
    return 0;
  }

  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Helmet title="All-Foods">
      <CommonSection title="Ăn uống" />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="search__widget d-flex align-items-center justify-content-between ">
                <input
                  type="text"
                  placeholder="Tìm kiếm...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
              <div className="sorting__widget text-end">
                <select className="w-30" onChange={e => setSortTerm(e.target.value)}>
                  <option value="default">Sắp xếp</option>
                  <option value="ascending">Theo bảng chữ cái, A-Z</option>
                  <option value="descending">Theo bảng chữ cái, Z-A</option>
                  <option value="high-price">Giá từ cao đến thấp</option>
                  <option value="low-price">Giá từ thấp đến cao</option>
                </select>
                <select className="w-30" onChange={e => setFilter(e.target.value)} style={{marginLeft: '10px'}}>
                  <option value="default">Danh mục</option>
                  {categories.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </Col>

            {displayPage.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}

            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Trước"}
                nextLabel={"Sau"}
                containerClassName=" paginationBttns "
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
