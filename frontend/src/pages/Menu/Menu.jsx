import React, { useEffect, useState } from 'react';
import "./Menu.css";
import Navbar from '../../components/navbar/Navbar';
import axios from "axios";
import { toast } from "react-hot-toast";
import ContactUs from '../../components/ContactUs/ContactUs';
import { useNavigate } from 'react-router-dom';

export default function Menu() {
  const [bestSeller, setBestSeller] = useState([]);
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(null); // new state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("Zaykaa"));
        if (user) {
          const { data } = await axios.get(`http://localhost:3000/api/cart/getItemsInCart?userID=${user.id}`);
          setCart(data.cart);
        }
        const bestSellerRes = await axios.get("http://localhost:3000/api/food/getAllItemFromBestseller");
        setBestSeller(bestSellerRes.data.details);

        const menuRes = await axios.get("http://localhost:3000/api/food/getAllFoodItems");
        setMenu(menuRes.data.data);

      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch data");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const addToCart = async (id) => {
    if (!JSON.parse(localStorage.getItem("Zaykaa"))) {
      toast.error("Login First To Add Item In Cart");
      return;
    }

    setAddingToCart(id);
    try {
      await axios.post("http://localhost:3000/api/cart/addItemInCart", {
        userID: JSON.parse(localStorage.getItem("Zaykaa")).id,
        itemID: `${id}`
      });
      const updatedCart = [...cart, { itemDetails: { _id: id } }];
      setCart(updatedCart);
      toast.success("Item added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item to cart");
    } finally {
      setAddingToCart(null); 
    }
  };

  const renderFoodCard = (obj) => {
    const isInCart = cart.some(item => item?.itemDetails?._id === obj._id);
    const isAdding = addingToCart === obj._id;

    return (
      <div className="cart-conatiner" key={obj._id}>
        <div>
          <img src={obj.foodImage} alt={obj.foodName} />
        </div>
        <div>
          <p className='cart-food-title'>{obj.foodName}</p>
          <p className='cart-food-desc'>{obj.foodDescription}</p>
          <p className='cart-food-price'>₹{obj.foodPrice}</p>
        </div>
        {isInCart ? (
          <button
            className='cart-food-but'
            style={{ backgroundColor: "#32de84" }}
            onClick={() => navigate("/cart")}
          >
            Go To Cart
          </button>
        ) : (
          <button
            className='cart-food-but'
            onClick={() => addToCart(obj._id)}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add To Cart"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="menu-conatiner">
      <Navbar />
      <div className="menu-gap"></div>

      {loading ? (
        <div className='loading-section-page'>Loading...</div>
      ) : (
        <>
          <section>
            <h2>Explore BestSeller Item</h2>
            <div className='all-cart-container'>
              {bestSeller.map((obj) => renderFoodCard(obj.item))}
            </div>
          </section>

          {['Appetizer', 'Main Course', 'Dessert', 'Beverages'].map((category) => (
            <section key={category}>
              <h2>{category}</h2>
              <div className='all-cart-container'>
                {menu
                  .filter(item => item.foodCategory === category)
                  .map((item) => renderFoodCard(item))
                }
              </div>
            </section>
          ))}
        </>
      )}
      <ContactUs />
    </div>
  );
}
