import CartItem from "./CartItem";

export default function CartGrid({
  addItemToCart,
  removeItems,
  isAuthenticated,
  vendor
}) {
  return (
    <>
      <CartItem
        isAuthenticated={isAuthenticated}
        vendor={vendor}
        addItemToCart={addItemToCart}
        removeItems={removeItems}
      />
    </>
  );
}
