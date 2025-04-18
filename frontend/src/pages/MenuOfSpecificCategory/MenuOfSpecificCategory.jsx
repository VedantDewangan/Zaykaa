import React, { useEffect, useState } from 'react';
import "./MenuOfSpecificCategory.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // you missed importing toast!

export default function MenuOfSpecificCategory() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [addingToCart, setAddingToCart] = useState(null);

  useEffect(() => {
    const getCartItem = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("Zaykaa"));
        if (user) {
          const { data } = await axios.get(`http://localhost:3000/api/cart/getItemsInCart?userID=${user.id}`);
          setCart(data.cart);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch cart items");
      }
      setLoading(false);
    };

    const getFullMenu = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:3000/api/food/getAllFoodItems");
        setMenu(data.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch full menu");
      }
      setLoading(false);
    };

    getFullMenu();
    getCartItem();
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
            <h2>{category === 'MainCourse' ? 'Main Course' : category}</h2>
            <div className='all-cart-container'>
              {menu
                .filter(obj => obj.foodCategory === (category === 'MainCourse' ? 'Main Course' : category))
                .map((obj) => renderFoodCard(obj))
              }
            </div>
          </section>

          <div className='view-full-menu'>
            <p>View Full Menu?</p>
            <Link to="/menu">Click Here!</Link>
          </div>
        </>
      )}
    </div>
  );
}
