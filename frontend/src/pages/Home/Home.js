/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
//import { useItemsContext } from "../../hooks/useItemsContext";
//components
import ItemDetails from "../Home/components/ItemDetails";
import FilterBrand from "../Home/components/FilterBrand";
import FilterCategory from "../Home/components/FilterCategory";
import FilterPrice from "../Home/components/FilterPrice";
import FilterSearchBar from "../Home/components/FilterSearchBar";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

// import ItemForm from "../components/ItemForm";
const Home = (props) => {
  //const { items, dispatch } = useItemsContext();
  const [items, setItems] = useState([]);
  const [flag,setFlag] = useState(true);
  const [isFiltered,setIsFiltered] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1000);
  const getMaxPriceFromJson = (json) => {
    let MaxPrice = 0;
    json.map((item) => {
      if (MaxPrice < item.price) {
        MaxPrice = item.price;
      }
    });
    return MaxPrice;
  };

  const [brands, setBrands] = useState([]);
  const getBrandsFromJson = (json) => {
    let brandsSet = new Set();
    // eslint-disable-next-line array-callback-return
    json.map((item) => {
      if (!brandsSet.has(item.brand)) {
        brandsSet.add(item.brand);
      }
    });
    return brandsSet;
  };

  const [categories, setCategories] = useState([]);
  const getCategoriesFromJson = (json) => {
    let categoriesSet = new Set();
    json.map((item) => {
      if (!categoriesSet.has(item.category)) {
        categoriesSet.add(item.category);
      }
    });
    return categoriesSet;
  };

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/items");
      const json = await response.json();

      if (response.ok) {
        if (brands.length === 0) {
          const brandsSet = getBrandsFromJson(json);
          const brandsArray = Array.from(brandsSet);
          setBrands(brandsArray);
        }
        if (categories.length === 0) {
          const categoriesSet = getCategoriesFromJson(json);
          const categoriesArray = Array.from(categoriesSet);
          setCategories(categoriesArray);
        }
        if (props.value[1] === 1000) {
          const maxPrice = getMaxPriceFromJson(json);
          setMaxPrice(maxPrice);
          props.value[1] = Math.round(maxPrice);
        }
        // dispatch({ type: "SET_ITEMS", payload: json });
        setItems(json);
        setFlag(false);
      }
    };
    if (flag){
      fetchItems();
    }
  }, [brands.length, categories.length, items, props.value,flag]);

  const submitFilter = async () => {
    setIsFiltered(true);
    let searchText = props.searchText.trim();
    if (props.searchText.trim().length === 0) {
      searchText = "All";
    }
    const response = await fetch(
      `/api/items/search/${searchText}/${props.brand}/${props.category}/${props.value[0]}/${props.value[1]}`
    );
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      // dispatch({ type: "SET_ITEMS", payload: json });
      setItems([]);
      setItems(json);
    }
  };

  return (
    <div className="home">
      <div className="filterBar">
        <FilterSearchBar
          searchText={props.searchText}
          setSearchText={props.setSearchText}
        />
        <FilterBrand
          brand={props.brand}
          setBrand={props.setBrand}
          brands={brands}
        />
        <FilterCategory
          category={props.category}
          setCategory={props.setCategory}
          categories={categories}
        />
        <FilterPrice
          value={props.value}
          setValue={props.setValue}
          maxPrice={maxPrice}
        />
        <Button
          onClick={submitFilter}
          variant="outlined"
          startIcon={<FilterAltIcon />}
        >
          Filter
        </Button>
      </div>
      <div className="items">
        {
          items.length > 0 &&
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
          {
            items.length === 0 && isFiltered && <h2 style={{textAlign:'center'}}>Oops Try To Search Again Couldn't Find Anything</h2>
          }
        
      </div>
    </div>
  );
};

export default Home;
