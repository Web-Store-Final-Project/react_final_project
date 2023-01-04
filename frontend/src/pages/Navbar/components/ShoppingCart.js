import * as React from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function SimpleBadge(props) {
  return (
    <Badge badgeContent={props.amountInCart} color="primary">
      <ShoppingCartIcon
        amountInCart={props.amountInCart}
        color="action"
        fontSize="medium"
      />
    </Badge>
  );
}
