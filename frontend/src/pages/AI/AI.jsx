import React, { useState, useEffect } from 'react';
import "./AI.css";
import Navbar from '../../components/navbar/Navbar';
import toast from 'react-hot-toast';
import axios from "axios"

export default function AI() {
    const [menu, setMenu] = useState([]);
    const [mood, setMood] = useState('');
    const [occasion, setOccasion] = useState('');
    const [people, setPeople] = useState('1');
    const [recommendations, setRecommendations] = useState([]);
    const [loading,SetLoading] = useState(false);

    useEffect(() => {
        const getFullMenu = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/api/food/getAllFoodItems");
                setMenu(data.data);

            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch full menu")
            }
        }
        getFullMenu();
    }, []);

    const foodAttributes = {
        "Spicy Loaded Nachos": {
            mood: ["Happy", "Excited"],
            occasion: ["Casual Meal", "Gathering"],
            people: ["1", "2", "3+"]
        },
        "Crispy Chicken Wings": {
            mood: ["Happy", "Excited"],
            occasion: ["Casual Meal", "Celebration", "Gathering"],
            people: ["1", "2", "3+"]
        },
        "Stuffed Cheese Mushrooms": {
            mood: ["Tired", "Sad"],
            occasion: ["Date Night", "Casual Meal"],
            people: ["1", "2"]
        },
        "Tandoori Paneer Tikka": {
            mood: ["Happy", "Excited"],
            occasion: ["Gathering", "Work Meeting"],
            people: ["1", "2", "3+"]
        },
        "Garlic Butter Prawns": {
            mood: ["Excited", "Tired"],
            occasion: ["Date Night", "Celebration"],
            people: ["1", "2"]
        },
        "Mutton Rogan Josh": {
            mood: ["Tired", "Sad"],
            occasion: ["Casual Meal", "Gathering"],
            people: ["1", "2", "3+"]
        },
        "Butter Chicken with Naan": {
            mood: ["Happy", "Excited"],
            occasion: ["Casual Meal", "Celebration"],
            people: ["1", "2", "3+"]
        },
        "Paneer Lababdar with Jeera Rice": {
            mood: ["Tired", "Happy"],
            occasion: ["Casual Meal", "Work Meeting"],
            people: ["1", "2"]
        },
        "Classic Alfredo Pasta": {
            mood: ["Sad", "Tired"],
            occasion: ["Date Night", "Casual Meal"],
            people: ["1", "2"]
        },
        "Veg Thai Green Curry": {
            mood: ["Tired", "Sad"],
            occasion: ["Casual Meal", "Work Meeting"],
            people: ["1", "2"]
        },
        "Tiramisu Delight": {
            mood: ["Happy", "Sad"],
            occasion: ["Date Night", "Celebration"],
            people: ["1"]
        },
        "Molten Lava Cake": {
            mood: ["Happy", "Excited", "Sad"],
            occasion: ["Date Night", "Celebration"],
            people: ["1", "2"]
        },
        "Classic Gulab Jamun": {
            mood: ["Happy", "Sad"],
            occasion: ["Celebration", "Casual Meal"],
            people: ["1", "2", "3+"]
        },
        "New York Cheesecake": {
            mood: ["Sad", "Happy"],
            occasion: ["Date Night", "Celebration"],
            people: ["1"]
        },
        "Rasmalai Indulgence": {
            mood: ["Happy", "Excited"],
            occasion: ["Celebration", "Casual Meal"],
            people: ["1", "2", "3+"]
        },
        "Mint Mojito Cooler": {
            mood: ["Happy", "Excited"],
            occasion: ["Gathering", "Work Meeting"],
            people: ["1", "2", "3+"]
        },
        "Cold Coffee with Ice Cream": {
            mood: ["Tired", "Happy"],
            occasion: ["Casual Meal", "Work Meeting"],
            people: ["1", "2"]
        },
        "Classic Masala Chai": {
            mood: ["Tired", "Sad"],
            occasion: ["Work Meeting", "Casual Meal"],
            people: ["1", "2", "3+"]
        },
        "Strawberry Sunrise Smoothie": {
            mood: ["Happy", "Excited"],
            occasion: ["Casual Meal", "Gathering"],
            people: ["1", "2"]
        },
        "Fresh Watermelon Juice": {
            mood: ["Happy", "Tired"],
            occasion: ["Casual Meal", "Work Meeting"],
            people: ["1", "2", "3+"]
        }
    };

    const handleRecommendation = (e) => {
        e.preventDefault();
        if(loading){
            return;
        }
        if(mood===''){
            toast.error("Please Enter your mood!!")
            return;
        }
        if(occasion===''){
            toast.error("Please Enter the occasion!!")
            return;
        }
        SetLoading(true);
        
        setTimeout(() => {
            const filteredFood = menu.filter(item => {
                const attributes = foodAttributes[item.foodName] || {};
                return (
                    (mood ? attributes.mood?.includes(mood) : true) &&
                    (occasion ? attributes.occasion?.includes(occasion) : true) &&
                    (people ? attributes.people?.includes(people) : true)
                );
            });
    
            setRecommendations(filteredFood);
            SetLoading(false);
        }, 2000);

    };

    return (
        <div className="ai-container">
            <Navbar />
            <div className="ai-gap"></div>
            <form className='Ai-Form' onSubmit={handleRecommendation}>
                <p>Enter the Details To Get AI Recommended Food</p>
                <div>
                    <label>Select Your Mood</label>
                    <select value={mood} onChange={(e) => setMood(e.target.value)}>
                        <option value="">Select</option>
                        <option value="Happy">Happy</option>
                        <option value="Sad">Sad</option>
                        <option value="Excited">Excited</option>
                        <option value="Tired">Tired</option>
                    </select>
                </div>
                <div>
                    <label>Select Occasion</label>
                    <select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                        <option value="">Select</option>
                        <option value="Date Night">Date Night</option>
                        <option value="Celebration">Celebration</option>
                        <option value="Gathering">Gathering</option>
                        <option value="Work Meeting">Work Meeting</option>
                        <option value="Casual Meal">Casual Meal</option>
                    </select>
                </div>
                <div>
                    <label>Select Number Of People</label>
                    <select value={people} onChange={(e) => setPeople(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="3+">3+</option>
                    </select>
                </div>
                <button type="submit">{loading?'Loading...':'Recommend Food'}</button>
            </form>

            <div className='recommendations'>
                <h3>Recommended Food:</h3>
                {recommendations.length > 0 ? (
                    <div className='recommendation-food-container'>
                        {recommendations.map((item, index) => (
                            <div key={item._id} className='recommendation-each-food-container' >
                                <img src={item.foodImage} alt="" />
                                <p>{item.foodName}</p>
                                <p>{item.foodDescription}</p>
                                <p>₹{item.foodPrice}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No recommendations available.</p>
                )}
            </div>
        </div>
    );
}