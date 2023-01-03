import { useEffect } from "react";
import { useItemsContext } from "../hooks/useItemsContext";

//components
import ItemDetails from "../components/ItemDetails";
import ItemForm from "../components/ItemForm";
import NotAuthorized from "./NotAuthorized/NotAuthorized";
const AdminHome = (props) => {
  const { items, dispatch } = useItemsContext();

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/items");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ITEMS", payload: json });
      }
    };

    fetchItems();
  }, [dispatch]);

  return (
    <>
      {!props.isAdmin && (
        <>
          <NotAuthorized />
        </>
      )}
      {props.isAdmin && (
        <>
          <ItemForm />
          <div className="items">
            {items &&
              items.map((item) => (
                <ItemDetails
                  item={item}
                  key={item._id}
                  isAdmin={props.isAdmin}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default AdminHome;
