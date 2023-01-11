import { useEffect, useState } from "react";
import { useItemsContext } from "../../hooks/useItemsContext";
//components
import ItemDetails from "../Home/components/ItemDetails";
import FilterBrand from "../Home/components/FilterBrand";
import FilterCategory from "../Home/components/FilterCategory";
import FilterPrice from "../Home/components/FilterPrice";
import FilterSearchBar from "../Home/components/FilterSearchBar";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { requirePropFactory } from "@mui/material";

// import ItemForm from "../components/ItemForm";
const Home = (props) => {
  const { items, dispatch } = useItemsContext();
  const [brands,setBrands] = useState([]);
  const getBrandsFromJson = (json) =>{
    let brandsSet = new Set();
    json.map((item) => { 
      if (!brandsSet.has(item.brand)){
          brandsSet.add(item.brand)
      }
    })
    return brandsSet;
  }
  
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/items");
      const json = await response.json();

      if (response.ok) {
        const brandsSet = getBrandsFromJson(json);
        const brandsArray = Array.from(brandsSet);
        setBrands(brandsArray);
        dispatch({ type: "SET_ITEMS", payload: json });
      }
    };

    fetchItems();
  }, [dispatch]);

  const submitFilter = async () => {
    console.log(props.searchText.trim());
    if (props.searchText.trim().length > 0) {
      const response = await fetch(
        `/api/items/search/${props.searchText.trim()}`
      );
      const json = await response.json();
      if (response.ok) {
        console.log(json);
        dispatch({ type: "SET_ITEMS", payload: json });
      }
    } else {
      const response = await fetch("/api/items");
      const json = await response.json();
      if (response.ok) {
        console.log(json);
        dispatch({ type: "SET_ITEMS", payload: json });
      }
    }
  };

  return (
    <div className="home">
      <div className="filterBar">
        <FilterSearchBar
          searchText={props.searchText}
          setSearchText={props.setSearchText}
        />
        <FilterBrand brand={props.brand} setBrand={props.setBrand} brands={brands} />
        <FilterCategory
          category={props.category}
          setCategory={props.setCategory}
        />
        <FilterPrice value={props.value} setValue={props.setValue} />
        <Button
          onClick={submitFilter}
          variant="outlined"
          startIcon={<FilterAltIcon />}
        >
          Filter
        </Button>
      </div>
      <div className="items">
        {items &&
          items.map((item) => (
            <ItemDetails
              isLoggedIn={props.isLoggedIn}
              amountInCart={props.amountInCart}
              setAmountInCart={props.setAmountInCart}
              item={item}
              key={item._id}
              cart={props.cart}
              setCart={props.setCart}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
