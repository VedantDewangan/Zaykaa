import React from 'react'
import './SearchByCategory.css'
import { Link } from 'react-router-dom'
import image1 from "../../images/searchByCategory1.jpg"
import image2 from "../../images/searchByCategory2.jpg"
import image3 from "../../images/searchByCategory3.jpeg"
import image4 from "../../images/searchByCategory4.jpg"

export default function SearchByCategory() {

    const arr = [
        {
            link:"Appetizer",
            image: image1,
            heading: "Appetizers",
            description: "Start your meal with delicious small bites, including crispy snacks, flavorful soups, and fresh salads that set the perfect tone for your dining experience."
        },
        {
            link:"MainCourse",
            image: image2,
            heading: "Main Course",
            description: "Satisfy your hunger with hearty, well-balanced dishes featuring rich flavors, including curries, pastas, grilled meats, and vegetarian specialties from around the world."
        },
        {
            link:"Dessert",
            image: image3,
            heading: "Desserts",
            description: "Indulge in sweet treats, from creamy cakes and pastries to traditional delicacies and frozen delights, offering a perfect ending to your meal."
        },
        {
            link: "Beverages",
            image: image4,
            heading: "Beverages",
            description: "Refresh yourself with a variety of drinks, including smoothies, fresh juices, mocktails, teas, coffees, and energy-boosting beverages to complement your meal."
        }
    ]

    return (
        <div className="Search-by-category-container">
            <p className='Search-by-category-container-small-heading'>
                SEARCH BY CATEGORY
            </p>
            <p className='Search-by-category-container-heading'>
                SATISFY YOUR CRAVINGS WITH <span>OUR SIGNATURE MAINS</span>
            </p>
            <div className='searchByCategoryConatinerParent'>
                {arr.map((obj, i) => {
                    return (
                        <Link key={i} className='searchByCategoryConatiner' to={`/menu/${obj.link}`} >
                            <div className='img-container'>
                            <img src={obj.image} alt="" />
                            </div>
                            <p className='searchByCategoryConatinerHeading'>{obj.heading}</p>
                            <p className='searchByCategoryConatinerDesc'>{obj.description}</p>
                        </Link>
                    )
                })}
            </div>
            <div className='Search-by-category-container-link'>
                <p>
                    Hungry for Something Delicious?
                </p>
                <Link to={'/menu'}>
                    View All Dishes!
                </Link>
            </div>
        </div>
    )
}
