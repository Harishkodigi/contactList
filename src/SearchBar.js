import React, { Fragment } from "react";
import "./App.css";

function SearchBar(props) {
  const [searchVal, setSearchVal] = React.useState("");

  const handleInput = (e) => {
    let searchValue = e.target.value
    setSearchVal(searchValue);
  };

  const handleClearBtn = () => {
    setSearchVal("");
  };

  const filteredProducts = props.products.filter((product) => {
    // return product.includes(searchVal);
    return product.toUpperCase().startsWith(searchVal.toUpperCase());
  });
  console.log(props, "props");

  const handleMouseHover = (name) => {
    props.selected(name);
  };

  console.log(props, "props from parent component");
  return (
    <>
      <div class="form">
        <i class="fa fa-search"></i>
        <input
          type="text"
          class="form-control form-input"
          placeholder="Search by name..."
          onChange={handleInput}
          value={searchVal}
          name="product-search"
          id="product-search"
        ></input>
        <span class="left-pan" onClick={handleClearBtn}>
          <i class="fa fa-remove"></i>
        </span>
      </div>
      <div className="results-wrap">
        <ul>
          {filteredProducts.map((data) => {
            return (
              <li key={data} className="list-item">
                <a href="#" onMouseEnter={() => handleMouseHover(data)}>
                  {data}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default SearchBar;
